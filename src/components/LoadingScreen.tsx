"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false);
  const particles = Array.from({ length: 30 }); // More particles for the forming effect

  useEffect(() => {
    setMounted(true);
    // The entire cinematic sequence takes exactly 6.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Absolute Black Background */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Tiny Glowing Particles Forming in Center */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        {mounted && particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[1px]"
            initial={{
              x: (Math.random() - 0.5) * window.innerWidth,
              y: (Math.random() - 0.5) * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: [0, 0.8, 0], // Fade in then vanish right before image forms
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* The Goofy Image Sequence */}
      {/* 
        Timeline (6.5s total):
        0.0s - 2.0s: Invisible
        2.0s - 3.5s: Tiny, slowly forming/glowing (opacity 0 -> 0.4, scale 0.05)
        3.5s (0.53): INSTANT JUMPSCARE! (opacity 1, scale 2)
        3.5s - 4.5s: Hold the jumpscare
        4.5s - 5.0s: Fade to black
      */}
      <motion.img
        src="/images/goofy.jpeg"
        alt="Wait for it..."
        className="absolute z-20 object-cover shadow-[0_0_100px_rgba(255,255,255,0.2)] mix-blend-luminosity"
        initial={{ opacity: 0, scale: 0.01 }}
        animate={{
          opacity: [0, 0, 0.4, 0.4, 1, 1, 0, 0],
          scale: [0.01, 0.01, 0.05, 0.05, 3.5, 3.5, 3.5, 3.5],
          filter: [
            "brightness(0) contrast(1)", 
            "brightness(0) contrast(1)", 
            "brightness(0.5) contrast(1.5)", 
            "brightness(0.5) contrast(1.5)", 
            "brightness(1.5) contrast(2)", // Jumpscare intense flash
            "brightness(1) contrast(1.2)", 
            "brightness(0) contrast(1)", 
            "brightness(0) contrast(1)"
          ],
          rotate: [0, 0, 0, 0, 0, 0, 0, 0], // Kept perfectly straight
        }}
        transition={{
          duration: 6.5,
          times: [0, 0.3, 0.45, 0.53, 0.535, 0.65, 0.75, 1],
          ease: "linear",
        }}
      />

      {/* Jumpscare Impact Flash */}
      <motion.div
        className="absolute inset-0 bg-white z-[100] pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.8, 0, 0] }}
        transition={{
          duration: 6.5,
          times: [0, 0.52, 0.53, 0.535, 0.56, 1],
          ease: "linear",
        }}
      />

      {/* Elegant "Presents" Text */}
      {/* 
        Timeline:
        0.0s - 4.5s: Hidden
        5.0s: Fade in
        6.0s: Fade out
      */}
      <motion.div
        className="absolute z-30 text-white font-light tracking-[1em] uppercase text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
        transition={{
          duration: 6.5,
          times: [0, 0.75, 0.77, 0.82, 0.9, 1], // Fades in around 5s
          ease: "easeInOut",
        }}
      >
        presents
      </motion.div>

    </motion.div>
  );
}
