"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
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
    <section className="contact-page">
      <h1>Contact Us</h1>
      <p>
        Want to integrate this chatbot in your product or need custom features? Send us a message and our team will get
        back to you quickly.
      </p>

      <div className="contact-layout">
        <form className="contact-form">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="How can we help?" required />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Write your message..." required />
          </div>

          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
