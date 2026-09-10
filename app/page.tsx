import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Problem } from "@/components/Problem";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Work } from "@/components/Work";
import { HowItWorks } from "@/components/HowItWorks";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <WhatWeDo />
        <Work />
        <HowItWorks />
        <About />
        <Testimonials />
        <Faq />
        <BookingCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
