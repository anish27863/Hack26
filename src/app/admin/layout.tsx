"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Trophy, Handshake, MessageCircle, Palette, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminPassphrase = useConfigStore(state => state.config.adminPassphrase);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [input, setInput] = React.useState("");

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Admin Dashboard</h2>
          <p className="text-[var(--muted-fg)] mb-6 text-sm">
            Demo gate only — not secure. In a production version this would be replaced by real session-based authentication against a backend.
          </p>
          <form onSubmit={e => { e.preventDefault(); if (input === adminPassphrase) setAuthenticated(true); }}>
            <input 
              type="password" 
              placeholder="Enter passphrase (hint: demo)" 
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-sm px-4 py-3 mb-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--color-coral-500)]"
            />
            <Button type="submit" className="w-full">Enter</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--muted-bg)] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[var(--card-bg)] border-r border-[var(--card-border)] flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-[var(--card-border)]">
          <Link href="/" className="text-xl font-bold text-[var(--foreground)] hover:text-[var(--color-coral-500)] transition-colors">
            HACK<span className="text-[var(--color-coral-500)]">26</span> Admin
          </Link>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/admin/registrations" icon={Users} label="Registrations" />
          <NavItem href="/admin/schedule" icon={Calendar} label="Schedule" />
          <NavItem href="/admin/prizes" icon={Trophy} label="Prizes" />
          <NavItem href="/admin/sponsors" icon={Handshake} label="Sponsors" />
          <NavItem href="/admin/faq" icon={MessageCircle} label="FAQ" />
          <NavItem href="/admin/theme" icon={Palette} label="Theme" />
          <NavItem href="/admin/settings" icon={Settings} label="Settings" />
        </nav>
      </aside>
      
      <main className="flex-1 overflow-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-sm transition-colors",
        isActive 
          ? "bg-[var(--color-coral-50)] dark:bg-[var(--color-coral-900)]/30 text-[var(--color-coral-500)] font-medium" 
          : "text-[var(--muted-fg)] hover:text-[var(--foreground)] hover:bg-[var(--background)]"
      )}>
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </div>
    </Link>
  );
}
