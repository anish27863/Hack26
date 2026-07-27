"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Button } from "@/components/ui/Button";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistrationsPage() {
  const registrations = useConfigStore(state => state.config.registrations);
  const updateRegistrationStatus = useConfigStore(state => state.updateRegistrationStatus);
  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [selectedReg, setSelectedReg] = React.useState<any>(null);

  const filtered = registrations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.teamName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">Registrations</h1>
      
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[var(--card-border)] flex flex-wrap gap-4 justify-between items-center bg-[var(--muted-bg)]">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-fg)]" />
            <input 
              type="text" 
              placeholder="Search by name or team..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[var(--background)] border border-[var(--card-border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-coral-500)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--muted-fg)]" />
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-[var(--background)] border border-[var(--card-border)] rounded-sm text-sm py-2 px-3 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--muted-bg)] text-[var(--muted-fg)]">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Team</th>
                <th className="px-6 py-4 font-medium">Track</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {filtered.map((r: any) => (
                <tr key={r.id} className="hover:bg-[var(--muted-bg)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--foreground)]">{r.name}</td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">{r.teamName}</td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">{r.track || "Web Dev"}</td>
                  <td className="px-6 py-4 text-[var(--muted-fg)]">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium ${
                      r.status === 'Approved' ? 'bg-[var(--color-sage-400)]/20 text-[var(--color-sage-600)] dark:text-[var(--color-sage-400)]' : 
                      r.status === 'Rejected' ? 'bg-[#C4645F]/20 text-[#C4645F]' : 
                      'bg-[var(--color-warm-taupe-300)]/20 text-[var(--color-espresso-600)] dark:text-[var(--color-warm-taupe-300)]'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" className="px-3 py-1 h-auto text-xs" onClick={() => setSelectedReg(r)}>Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedReg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--card-bg)] max-w-2xl w-full rounded-sm shadow-xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-[var(--card-border)] flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Team Details: {selectedReg.teamName}</h3>
                <button onClick={() => setSelectedReg(null)} className="text-[var(--muted-fg)] hover:text-[var(--foreground)]"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] mb-2">Participant</h4>
                  <p className="text-[var(--foreground)] text-lg font-medium">{selectedReg.name}</p>
                  <p className="text-[var(--muted-fg)]">{selectedReg.email} • {selectedReg.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] mb-1">College</h4>
                    <p className="text-[var(--foreground)]">{selectedReg.college}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Track</h4>
                    <p className="text-[var(--foreground)]">{selectedReg.track || "Web Dev"}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)] mb-1">Team Size</h4>
                    <p className="text-[var(--foreground)]">{selectedReg.teamSize}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-[var(--card-border)] flex justify-end gap-3 bg-[var(--muted-bg)]">
                <Button variant="outline" className="!text-[#C4645F] !border-[#C4645F] hover:!bg-[#C4645F]/10" onClick={() => { updateRegistrationStatus(selectedReg.id, "Rejected"); setSelectedReg(null); }}>
                  Reject
                </Button>
                <Button className="!bg-[var(--color-sage-400)] !text-[var(--color-ink)] hover:!bg-[var(--color-sage-500)] border-none" onClick={() => { updateRegistrationStatus(selectedReg.id, "Approved"); setSelectedReg(null); }}>
                  Approve
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
