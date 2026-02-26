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
          <li>Agentic reasoning helps the chatbot choose the right tool path based on your query intent.</li>
          <li>Context-aware follow-ups let the assistant continue multi-step tasks without losing conversation state.</li>
        </ul>
      </article>

      <article className="info-card info-card-implementation">
        <h3>Tool Calling in Action</h3>
        <p className="info-note">
          Ask real-world questions and the assistant can route to tools like web search, calculator, and stock fetch
          to generate practical answers.
        </p>
        <ul>
          <li>Example: "What is Tesla stock price and 15% of that?" uses stock + calculator tools in one flow.</li>
          <li>Example: "Find top AI news today and summarize in 5 points" triggers web-search tool calling.</li>
          <li>You can chat in multiple languages: English, Hindi, Chinese, Spanish, and German.</li>
          <li className="mobile-hide-item">Tool-calling keeps responses actionable instead of generic text output.</li>
        </ul>
      </article>
    </section>
  );
}



