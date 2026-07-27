"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Users, TrendingUp, ShieldCheck } from "lucide-react";

function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[var(--muted-fg)] font-medium text-sm">{title}</h3>
        <div className="w-10 h-10 rounded-sm bg-[var(--color-coral-50)] dark:bg-[var(--color-coral-900)]/30 flex items-center justify-center text-[var(--color-coral-500)]">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-[var(--foreground)] mb-1">{value}</div>
      <div className="text-sm text-[var(--color-sage-400)] font-medium flex items-center gap-1">
        <TrendingUp className="w-4 h-4" /> {trend}
      </div>
    </div>
  );
}

function MockPieChart() {
  const gradient = `conic-gradient(var(--color-coral-500) 0% 60%, var(--color-sage-400) 60% 85%, var(--color-warm-taupe-300) 85% 100%)`;
  
  return (
    <div className="flex items-center gap-8">
      <div className="w-32 h-32 rounded-full relative" style={{ background: gradient }}>
        <div className="absolute inset-4 bg-[var(--card-bg)] rounded-full"></div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[var(--color-coral-500)] rounded-sm"></div> Web Dev (60%)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[var(--color-sage-400)] rounded-sm"></div> AI/ML (25%)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[var(--color-warm-taupe-300)] rounded-sm"></div> Mobile (15%)</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const registrations = useConfigStore(state => state.config.registrations);
  const pending = registrations.filter(r => r.status === "Pending").length;
  const approved = registrations.filter(r => r.status === "Approved").length;
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Registrations" value={registrations.length} icon={Users} trend="+12% this week" />
        <StatCard title="Approved Teams" value={approved} icon={ShieldCheck} trend="+5% this week" />
        <StatCard title="Pending Review" value={pending} icon={TrendingUp} trend="Requires attention" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">Track Distribution</h3>
          <MockPieChart />
        </div>
        
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">Recent Registrations</h3>
          <div className="space-y-4">
            {registrations.slice(-3).map(r => (
              <div key={r.id} className="flex justify-between items-center pb-4 border-b border-[var(--card-border)] last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-[var(--foreground)]">{r.name}</p>
                  <p className="text-sm text-[var(--muted-fg)]">{r.teamName}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-sm ${r.status === 'Approved' ? 'bg-[var(--color-sage-400)] text-[var(--color-ink)]' : 'bg-[var(--color-warm-taupe-300)] text-white'}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
