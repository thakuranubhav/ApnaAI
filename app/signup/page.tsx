"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
    setStatus("Creating account...");

    try {
      const res = await signup(name.trim(), email.trim(), password);
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      setStatus("Signup successful. Redirecting...");
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
        <h1>Sign Up</h1>
        <p className="muted">Create your account to start chatting.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </label>

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
              placeholder="Minimum 6 characters"
              minLength={6}
              required
            />
          </label>

          <button className="primary-btn" type="submit" disabled={busy}>
            {busy ? "Please wait..." : "Create Account"}
          </button>
        </form>

        <div className="status">{status}</div>
        <p className="auth-switch">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
