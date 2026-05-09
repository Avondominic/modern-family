"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FamilyOverview from "@/components/FamilyOverview";
import CharacterSpotlight from "@/components/CharacterSpotlight";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Navbar />
        
        <section id="hero" className="relative z-10">
          <HeroSection />
        </section>
        
        {/* Seamless Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[2px]" />
        </div>
        
        <section id="families" className="relative z-10">
          <FamilyOverview />
        </section>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[2px]" />
        </div>
        
        <section id="characters" className="relative z-10">
          <CharacterSpotlight />
        </section>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[2px]" />
        </div>
        
        <section id="journey" className="relative z-10">
          <Timeline />
        </section>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[2px]" />
        </div>
        
        <section id="legacy" className="relative z-10">
          <Footer />
        </section>
      </motion.div>
    </main>
  );
}
