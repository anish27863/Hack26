"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import { Button } from "./ui/Button";

export function Footer() {
  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[var(--color-espresso-600)] text-[var(--color-paper)] dark:bg-[#151210] pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="#hero" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight text-white">
                HACK<span className="text-[var(--color-coral-500)]">26</span>
              </span>
            </Link>
            <p className="text-[var(--color-warm-taupe-200)] max-w-sm mb-6">
              Join us for 48 hours of building, learning, and networking. The ultimate hackathon experience.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" className="px-2 py-2 text-[var(--color-warm-taupe-200)] hover:text-white" magnetic={false}><Globe className="w-5 h-5" /></Button>
              <Button variant="ghost" className="px-2 py-2 text-[var(--color-warm-taupe-200)] hover:text-white" magnetic={false}><Share2 className="w-5 h-5" /></Button>
              <Button variant="ghost" className="px-2 py-2 text-[var(--color-warm-taupe-200)] hover:text-white" magnetic={false}><Mail className="w-5 h-5" /></Button>
              <Button variant="ghost" className="px-2 py-2 text-[var(--color-warm-taupe-200)] hover:text-white" magnetic={false}><MessageCircle className="w-5 h-5" /></Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-[var(--color-warm-taupe-200)] hover:text-white transition-colors">About</Link></li>
              <li><Link href="#schedule" className="text-[var(--color-warm-taupe-200)] hover:text-white transition-colors">Schedule</Link></li>
              <li><Link href="#prizes" className="text-[var(--color-warm-taupe-200)] hover:text-white transition-colors">Prizes</Link></li>
              <li><Link href="#faq" className="text-[var(--color-warm-taupe-200)] hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-3 text-[var(--color-warm-taupe-200)]">
              <li>hello@hack26.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Tech Campus, Silicon Valley</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-espresso-500)] dark:border-[#2A2320] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[var(--color-warm-taupe-200)] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Hack26. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-[var(--color-warm-taupe-200)]">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--color-coral-500)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
