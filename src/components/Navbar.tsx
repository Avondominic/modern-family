"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12",
        scrolled ? "py-4" : "py-8"
      )}
    >
      {/* Dynamic Background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-700 pointer-events-none",
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent border-transparent"
      )} />

      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <div className="text-2xl font-bold tracking-tighter text-white cursor-pointer group">
          MF<span className="text-accent transition-colors duration-500 group-hover:text-white">.</span>U
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {["Families", "Characters", "Journey", "Legacy"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300 font-semibold"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <button className="relative px-6 py-2.5 bg-transparent text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden group border border-white/20 hover:border-accent/50 transition-colors duration-500">
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Enter</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.25,0.1,0.25,1] z-0" />
          </button>
        </div>
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer group">
          <div className="w-6 h-[1px] bg-white group-hover:bg-accent transition-colors duration-300" />
          <div className="w-4 h-[1px] bg-white group-hover:bg-accent transition-colors duration-300 ml-auto" />
        </div>
      </div>
    </motion.nav>
  );
}
