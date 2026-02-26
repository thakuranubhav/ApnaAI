"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>2026 ApnaAI. Built for fast and reliable assistant experiences.</p>
        <p className="footer-rights">All rights reserved.</p>
      </div>
    </footer>
  );
}
