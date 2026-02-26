"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatClient from "@/components/ChatClient";

export default function ChatPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (!raw) {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <h1>Checking session...</h1>
          <p className="muted">Redirecting to login if not authenticated.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chat-page">
      <ChatClient />
    </section>
  );
}
