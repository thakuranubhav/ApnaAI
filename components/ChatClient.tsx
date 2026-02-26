"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { chat, createThread, getThreadMessages, listThreads } from "@/lib/api";
import { Message } from "@/types/chat";

function shortId(id: string): string {
  return `${id.slice(0, 8)}...${id.slice(-4)}`;
}

export default function ChatClient() {
  const [threads, setThreads] = useState<string[]>([]);
  const [activeThread, setActiveThread] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("Initializing...");
  const messagePaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void bootstrap();
  }, []);

  useEffect(() => {
    if (!messagePaneRef.current) {
      return;
    }
    messagePaneRef.current.scrollTop = messagePaneRef.current.scrollHeight;
  }, [messages]);

  const threadCountLabel = useMemo(() => {
    if (threads.length === 0) {
      return "No threads yet";
    }
    return `${threads.length} thread${threads.length > 1 ? "s" : ""}`;
  }, [threads]);

  async function bootstrap() {
    try {
      const threadRes = await listThreads();
      let list = threadRes.threads;

      if (list.length === 0) {
        const created = await createThread();
        list = [created.thread_id];
      }

      setThreads(list);
      const latest = list[list.length - 1];
      setActiveThread(latest);

      const msgRes = await getThreadMessages(latest);
      setMessages(msgRes.messages);
      setStatus("Connected");
    } catch (error) {
      setStatus((error as Error).message);
    }
  }

  async function switchThread(threadId: string) {
    if (busy) {
      return;
    }

    setStatus("Loading conversation...");
    try {
      const msgRes = await getThreadMessages(threadId);
      setActiveThread(threadId);
      setMessages(msgRes.messages);
      setStatus("Connected");
    } catch (error) {
      setStatus((error as Error).message);
    }
  }

  async function handleNewChat() {
    if (busy) {
      return;
    }

    setStatus("Creating thread...");
    try {
      const created = await createThread();
      setThreads((prev) => [...prev, created.thread_id]);
      setActiveThread(created.thread_id);
      setMessages([]);
      setStatus("Connected");
    } catch (error) {
      setStatus((error as Error).message);
    }
  }

  async function doSendMessage() {
    if (busy || !draft.trim() || !activeThread) {
      return;
    }

    const userText = draft.trim();
    setDraft("");
    setBusy(true);
    setStatus("Assistant is thinking...");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    try {
      const res = await chat(activeThread, userText);
      const full = res.reply || "No response generated.";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let current = "";
      for (const ch of full) {
        current += ch;
        await new Promise((resolve) => setTimeout(resolve, 8));
        setMessages((prev) => {
          const next = [...prev];
          const idx = next.length - 1;
          next[idx] = { role: "assistant", content: current };
          return next;
        });
      }

      setStatus("Connected");
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: failed to get response." }]);
      setStatus((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await doSendMessage();
  }

  return (
    <div className="chat-shell">
      <aside className="chat-sidebar">
        <h2>Conversations</h2>
        <div className="muted">{threadCountLabel}</div>
        <button className="primary-btn" type="button" onClick={handleNewChat} disabled={busy}>
          + New Chat
        </button>

        <div className="thread-list">
          {threads.map((thread) => (
            <button
              key={thread}
              className={`thread-btn ${thread === activeThread ? "active" : ""}`}
              type="button"
              onClick={() => void switchThread(thread)}
            >
              {shortId(thread)}
            </button>
          ))}
        </div>
      </aside>

      <section className="chat-panel">
        <div className="messages" ref={messagePaneRef}>
          {messages.length === 0 && <div className="muted">Start the conversation.</div>}
          {messages.map((m, idx) => (
            <div key={`${idx}-${m.role}`} className={`bubble ${m.role}`}>
              {m.content}
            </div>
          ))}
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask anything..."
            disabled={busy || !activeThread}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void doSendMessage();
              }
            }}
          />
          <button className="primary-btn" type="submit" disabled={busy || !draft.trim() || !activeThread}>
            Send
          </button>
        </form>

        <div className="status">{status}</div>
      </section>
    </div>
  );
}
