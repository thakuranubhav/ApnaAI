"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setAuthorized(Boolean(localStorage.getItem("auth_user")));
  }, []);

  return (
    <section className="home-layout">
      <article className="hero-banner">
        <div className="hero-overlay">
          <p className="eyebrow">Tool-Powered AI Assistant</p>
          <h1>Your Intelligent ChatBot with Real Tools</h1>
          <p className="lead">
            Not just another chatbot. Execute web search, fetch live stock data, calculate results, and manage
            multi-thread conversations - all powered by LangGraph orchestration.
          </p>
          <div className="hero-actions">
            {authorized ? (
              <>
                <Link href="/chat" className="primary-btn link-btn hero-launch-btn">
                  Start Chat
                </Link>
                <Link href="/contact" className="ghost-btn link-btn">
                  Contact Us
                </Link>
              </>
            ) : (
              <>
                <Link href="/chat" className="primary-btn link-btn hero-launch-btn">
                  Start Chat
                </Link>
                <Link href="/contact" className="ghost-btn link-btn">
                  Contact Us
                </Link>
              </>
            )}
          </div>
        </div>
      </article>

      <article className="info-card info-card-core">
        <h3>Core Capabilities</h3>
        <ul>
          <li>Integrated web search, stock APIs, and calculator tools with dynamic routing via LangGraph.</li>
          <li>Thread-based chat sessions powered by checkpointing architecture.</li>
          <li>Separated frontend and backend architecture for production deployment.</li>
        </ul>
      </article>

      <article className="info-card info-card-implementation">
        <h3>Implementation Snapshot</h3>
        <p className="info-note">
          ApnaAI combines a production-ready Next.js interface with a tool-orchestrated assistant backend for fast,
          <span className="mobile-hide-inline"> practical responses.</span>
        </p>
        <ul>
          <li>LangGraph orchestrates tool-selection and response generation.</li>
          <li>Backend handles APIs and checkpoints, frontend focuses on UX and chat flow.</li>
          <li>Each thread maintains contextual memory for reliable, multi-step conversations.</li>
          <li className="mobile-hide-item">Authentication, chat sessions, and contact flows are modular for easier scaling.</li>
          <li className="mobile-hide-item">Real tool integrations keep answers actionable instead of generic text output.</li>
        </ul>
      </article>
    </section>
  );
}



