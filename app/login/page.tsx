"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) {
      return;
    }

    setBusy(true);
    setStatus("Logging in...");

    try {
      const res = await login(email.trim(), password);
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      setStatus("Login successful. Redirecting...");
      router.push("/chat");
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="muted">Access your chat account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          <button className="primary-btn" type="submit" disabled={busy}>
            {busy ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className="status">{status}</div>
        <p className="auth-switch">
          New user? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
