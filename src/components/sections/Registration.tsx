"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function CustomConfetti() {
  const colors = ["#E7717D", "#AFD275", "#C2B9B0"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: "50%", opacity: 1 }}
          animate={{ 
            y: 400 + Math.random() * 200, 
            x: `${50 + (Math.random() - 0.5) * 150}%`,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
          className="absolute top-0 left-0"
          style={{
            width: Math.random() * 10 + 6 + "px",
            height: Math.random() * 10 + 6 + "px",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px"
          }}
        />
      ))}
    </div>
  );
}

export function Registration() {
  const addRegistration = useConfigStore(state => state.addRegistration);
  
  const [step, setStep] = React.useState(1);
  const totalSteps = 4;
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    name: "", email: "", phone: "", college: "", department: "", year: "",
    teamName: "", teamSize: "1", leader: "", participationType: "In-Person",
    track: "Web Development", github: "", linkedin: "", portfolio: "",
    rules: false, privacy: false
  });

  const update = (field: string, value: any) => setFormData(p => ({ ...p, [field]: value }));
  
  const validateStep = (s: number) => {
    if (s === 1) return formData.name && formData.email.includes("@") && formData.college;
    if (s === 2) return formData.teamName && formData.teamSize;
    if (s === 3) return formData.track;
    if (s === 4) return formData.rules && formData.privacy;
    return false;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    
    addRegistration({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: "Pending",
      date: new Date().toISOString()
    });
    
    setLoading(false);
    setSuccess(true);
  };

  const inputClass = "w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--color-coral-500)] focus:ring-1 focus:ring-[var(--color-coral-500)] transition-all";
  
  const getValidationClass = (val: string, type: "email" | "text" = "text") => {
    if (!val) return "";
    let isValid = val.length > 2;
    if (type === "email") isValid = val.includes("@") && val.includes(".");
    return isValid ? "border-[var(--color-sage-400)] focus:border-[var(--color-sage-400)] focus:ring-[var(--color-sage-400)]" : "border-[#C4645F] focus:border-[#C4645F] focus:ring-[#C4645F]";
  };

  return (
    <section id="register" className="py-24 bg-[var(--background)] relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <Eyebrow>Join the Action</Eyebrow>
          <h2 className="text-h1 font-semibold text-[var(--foreground)] tracking-tight">
            Registration
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-8 shadow-sm">
          <div className="mb-8 relative h-1 bg-[var(--color-warm-taupe-200)] dark:bg-[var(--color-espresso-800)] rounded-full overflow-hidden">
             <motion.div 
               className="absolute left-0 top-0 bottom-0 bg-gradient-hero"
               initial={{ width: "25%" }}
               animate={{ width: `${(step / totalSteps) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
          </div>

          <form onSubmit={submit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Full Name</label>
                    <input type="text" className={cn(inputClass, getValidationClass(formData.name))} value={formData.name} onChange={e => update("name", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Email Address</label>
                    <input type="email" className={cn(inputClass, getValidationClass(formData.email, "email"))} value={formData.email} onChange={e => update("email", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Phone</label>
                    <input type="tel" className={cn(inputClass, getValidationClass(formData.phone))} value={formData.phone} onChange={e => update("phone", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">College/University</label>
                    <input type="text" className={cn(inputClass, getValidationClass(formData.college))} value={formData.college} onChange={e => update("college", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Department</label>
                    <input type="text" className={cn(inputClass)} value={formData.department} onChange={e => update("department", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Year of Study</label>
                    <select className={cn(inputClass)} value={formData.year} onChange={e => update("year", e.target.value)}>
                      <option value="">Select Year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button type="button" onClick={() => validateStep(1) && setStep(2)} disabled={!validateStep(1)}>Next Step</Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Team Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Team Name</label>
                    <input type="text" className={cn(inputClass, getValidationClass(formData.teamName))} value={formData.teamName} onChange={e => update("teamName", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Team Size</label>
                    <input type="number" min="1" max="4" className={cn(inputClass)} value={formData.teamSize} onChange={e => update("teamSize", e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Participation Type</label>
                    <select className={cn(inputClass)} value={formData.participationType} onChange={e => update("participationType", e.target.value)}>
                      <option>In-Person</option>
                      <option>Remote</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button type="button" onClick={() => validateStep(2) && setStep(3)} disabled={!validateStep(2)}>Next Step</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Technical Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">Primary Track</label>
                    <select className={cn(inputClass)} value={formData.track} onChange={e => update("track", e.target.value)}>
                      <option>Web Development</option>
                      <option>AI / ML</option>
                      <option>Mobile App</option>
                      <option>Blockchain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">GitHub Profile (optional)</label>
                    <input type="url" className={cn(inputClass)} value={formData.github} onChange={e => update("github", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--muted-fg)] uppercase tracking-wider">LinkedIn (optional)</label>
                    <input type="url" className={cn(inputClass)} value={formData.linkedin} onChange={e => update("linkedin", e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="ghost" onClick={() => setStep(2)}>Back</Button>
                  <Button type="button" onClick={() => validateStep(3) && setStep(4)} disabled={!validateStep(3)}>Next Step</Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Agreement</h3>
                <div className="space-y-4 border border-[var(--color-warm-taupe-200)] dark:border-[var(--color-espresso-800)] p-6 rounded-sm bg-[var(--muted-bg)]">
                   <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[var(--color-coral-500)] w-4 h-4 rounded-sm border-gray-300" checked={formData.rules} onChange={e => update("rules", e.target.checked)} />
                    <span className="text-sm text-[var(--muted-fg)]">I agree to abide by the Hackathon Code of Conduct and event rules. I understand that failure to comply may result in disqualification.</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[var(--color-coral-500)] w-4 h-4 rounded-sm border-gray-300" checked={formData.privacy} onChange={e => update("privacy", e.target.checked)} />
                    <span className="text-sm text-[var(--muted-fg)]">I consent to the collection and processing of my personal data for the purpose of this event.</span>
                  </label>
                </div>
                <div className="flex justify-between mt-8">
                  <Button type="button" variant="ghost" onClick={() => setStep(3)}>Back</Button>
                  <Button type="submit" disabled={!validateStep(4) || loading}>
                    {loading ? "Submitting..." : "Complete Registration"}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[var(--color-ink)]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--card-bg)] max-w-md w-full rounded-sm p-8 text-center relative overflow-hidden border border-[var(--color-coral-500)]/30 shadow-2xl"
            >
              <CustomConfetti />
              
              <div className="w-20 h-20 bg-[var(--color-sage-400)]/20 text-[var(--color-sage-400)] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[var(--foreground)] relative z-10 tracking-tight">You're In!</h3>
              <p className="text-[var(--muted-fg)] mb-8 relative z-10 leading-relaxed">
                Your registration has been received successfully. Check your email for further instructions.
              </p>
              <Button onClick={() => { setSuccess(false); setStep(1); setFormData({...formData, name:"", email:""}); }} className="w-full relative z-10">
                Return Home
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
