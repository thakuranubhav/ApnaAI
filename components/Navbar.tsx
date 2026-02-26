"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AuthUser } from "@/types/chat";

const publicNavItems = [{ href: "/", label: "Home" }];
const privateNavItems = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact Us" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (!raw) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(raw) as AuthUser);
    } catch {
      localStorage.removeItem("auth_user");
      setUser(null);
    }
  }, [pathname]);

  const navItems = useMemo(() => (user ? privateNavItems : publicNavItems), [user]);

  function handleLogout() {
    localStorage.removeItem("auth_user");
    setUser(null);
    router.push("/");
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Go to home">
          <span className="logo-mark">AA</span>
          <span className="logo-text">ApnaAI</span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {user && (
            <span className="nav-user" title={user.email}>
              {(user.name?.trim()?.[0] ?? "U").toUpperCase()}
            </span>
          )}

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`nav-link ${isActive ? "active" : ""}`}>
                {item.label}
              </Link>
            );
          })}

          {user ? (
            <button type="button" className="ghost-btn nav-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="auth-actions">
              <Link href="/login" className="ghost-btn link-btn">
                Login
              </Link>
              <Link href="/signup" className="primary-btn link-btn">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

