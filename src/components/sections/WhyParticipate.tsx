import { Eyebrow } from "../ui/Eyebrow";
import { TiltCard } from "../ui/TiltCard";
import { Trophy, Code2, Cpu, Users, GraduationCap, Briefcase } from "lucide-react";

const REASONS = [
  { icon: Trophy, title: "Win Exciting Prizes", desc: "Compete for a pool of cash prizes, swags, and exclusive software licenses." },
  { icon: Code2, title: "Build Real Projects", desc: "Turn your ideas into working prototypes over a weekend of intense building." },
  { icon: Cpu, title: "Learn New Technologies", desc: "Explore new frameworks and APIs with the help of our technical workshops." },
  { icon: Users, title: "Meet Mentors", desc: "Get 1-on-1 guidance from industry experts and experienced engineers." },
  { icon: GraduationCap, title: "Expand Network", desc: "Connect with like-minded peers and form lasting professional relationships." },
  { icon: Briefcase, title: "Boost Resume", desc: "Add an impressive project to your portfolio that recruiters will love." },
];

export function WhyParticipate() {
  return (
    <section className="py-24 bg-[var(--muted-bg)] border-y border-[var(--color-warm-taupe-200)] dark:border-[var(--color-espresso-800)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <Eyebrow>Why Join Us</Eyebrow>
          <h2 className="text-h1 font-semibold text-[var(--foreground)] tracking-tight">
            Reasons to Participate
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <TiltCard key={idx} delay={idx * 0.1}>
                <div className="w-12 h-12 bg-[var(--color-coral-50)] dark:bg-[var(--color-coral-900)] rounded-sm flex items-center justify-center mb-6 text-[var(--color-coral-500)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">{reason.title}</h3>
                <p className="text-[var(--muted-fg)] leading-relaxed">
                  {reason.desc}
                </p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
