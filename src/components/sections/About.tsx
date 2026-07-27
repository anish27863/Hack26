import { Eyebrow } from "../ui/Eyebrow";

export function About() {
  return (
    <section id="about" className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <Eyebrow>The Vision</Eyebrow>
            <h2 className="text-h1 font-semibold mb-6 text-[var(--foreground)] tracking-tight">
              More than just a hackathon. <br/>
              <span className="text-[var(--color-coral-500)]">It's a launchpad.</span>
            </h2>
            <p className="text-[var(--muted-fg)] mb-6 text-lg leading-relaxed">
              We believe in the power of bringing creative minds together. Our goal is to provide a platform where you can build real-world solutions, learn emerging technologies, and connect with industry leaders.
            </p>
            <p className="text-[var(--muted-fg)] text-lg leading-relaxed">
              Whether you are a seasoned developer or a first-time hacker, you'll find the resources, mentorship, and community you need to turn your ideas into reality.
            </p>
          </div>
          <div className="lg:w-1/2 w-full h-[400px] bg-[var(--color-warm-taupe-200)] dark:bg-[var(--color-espresso-800)] rounded-sm relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
              alt="Collaboration" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
