"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const event = useConfigStore(state => state.config.event);
  const updateConfig = useConfigStore(state => state.updateConfig);
  const [formData, setFormData] = React.useState(event);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig("event", formData);
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">Event Settings</h1>
      
      <form onSubmit={handleSave} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm shadow-sm p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Event Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-sm px-4 py-2 text-[var(--foreground)] focus:outline-none focus:border-[var(--color-coral-500)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Tagline</label>
          <input 
            type="text" 
            value={formData.tagline}
            onChange={e => setFormData({...formData, tagline: e.target.value})}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-sm px-4 py-2 text-[var(--foreground)] focus:outline-none focus:border-[var(--color-coral-500)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Description</label>
          <textarea 
            rows={4}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-sm px-4 py-2 text-[var(--foreground)] focus:outline-none focus:border-[var(--color-coral-500)]"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
           <div>
            <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Start Date</label>
            <input 
              type="datetime-local" 
              value={new Date(formData.startDate).toISOString().slice(0,16)}
              onChange={e => setFormData({...formData, startDate: new Date(e.target.value).toISOString()})}
              className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-sm px-4 py-2 text-[var(--foreground)] focus:outline-none focus:border-[var(--color-coral-500)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--foreground)]">Registration Deadline</label>
            <input 
              type="datetime-local" 
              value={new Date(formData.registrationDeadline).toISOString().slice(0,16)}
              onChange={e => setFormData({...formData, registrationDeadline: new Date(e.target.value).toISOString()})}
              className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-sm px-4 py-2 text-[var(--foreground)] focus:outline-none focus:border-[var(--color-coral-500)]"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
