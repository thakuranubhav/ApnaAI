import { AuthResponse, ChatResponse, ThreadMessagesResponse, ThreadsResponse } from "@/types/chat";

const DEFAULT_API_BASE = "https://chatbot-agent-backend-1.onrender.com";
const DEFAULT_AUTH_API_BASE = "https://auth-api-chatbot.onrender.com";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE).replace(/\/$/, "");
const AUTH_API_BASE = (process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? DEFAULT_AUTH_API_BASE).replace(/\/$/, "");

async function request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function chatRequest<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(API_BASE, path, init);
}

function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(AUTH_API_BASE, path, init);
}

export function listThreads(): Promise<ThreadsResponse> {
  return chatRequest<ThreadsResponse>("/threads");
}

export function createThread(): Promise<{ thread_id: string }> {
  return chatRequest<{ thread_id: string }>("/threads", {
    method: "POST"
  });
}

export function getThreadMessages(threadId: string): Promise<ThreadMessagesResponse> {
  return chatRequest<ThreadMessagesResponse>(`/threads/${threadId}/messages`);
}

export function chat(threadId: string, message: string): Promise<ChatResponse> {
  return chatRequest<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify({ thread_id: threadId, message })
  });
}

export function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  return authRequest<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return authRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}
