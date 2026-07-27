import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyParticipate } from "@/components/sections/WhyParticipate";
import { Statistics } from "@/components/sections/Statistics";
import { Schedule } from "@/components/sections/Schedule";
import { PrizePool } from "@/components/sections/PrizePool";
import { Sponsors } from "@/components/sections/Sponsors";
import { Registration } from "@/components/sections/Registration";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WhyParticipate />
      <Statistics />
      <Schedule />
      <PrizePool />
      <Sponsors />
      <Registration />
      <FAQ />
      <Footer />
      <AnnouncementBar />
    </main>
  );
}
