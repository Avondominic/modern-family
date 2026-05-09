"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Floating particles generator
  const particles = Array.from({ length: 20 });

  // Collage Images Data - Adjusted for mobile scale
  const heroImages = [
    { src: "/images/Hero page pics/1.jpg", className: "top-[5%] left-[-5%] w-[45vw] md:w-[35vw] h-[30vh] md:h-[50vh] -rotate-6" },
    { src: "/images/Hero page pics/2.webp", className: "bottom-[5%] left-[0%] w-[40vw] md:w-[32vw] h-[35vh] md:h-[55vh] rotate-3" },
    { src: "/images/Hero page pics/3.webp", className: "top-[10%] right-[2%] w-[35vw] md:w-[30vw] h-[25vh] md:h-[45vh] rotate-12" },
    { src: "/images/Hero page pics/4.avif", className: "bottom-[0%] right-[-5%] w-[50vw] md:w-[38vw] h-[35vh] md:h-[55vh] -rotate-6" },
    { src: "/images/Hero page pics/5.avif", className: "top-[45%] left-[-10%] w-[35vw] md:w-[28vw] h-[25vh] md:h-[45vh] rotate-[-12deg]" },
    { src: "/images/Hero page pics/6.jpg", className: "top-[0%] right-[-5%] w-[40vw] md:w-[32vw] h-[30vh] md:h-[50vh] rotate-6" },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Parallax Background with Slow Cinematic Zoom */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{ y: backgroundY }}
      >
        {/* Cinematic Collage Background */}
        <div className="absolute inset-0 z-0 bg-[#020202] flex items-center justify-center overflow-hidden">
          {/* Surrounding Collage Images */}
          {heroImages.map((img, i) => (
            <motion.div
              key={i}
              className={`absolute opacity-80 overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ${img.className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1, y: [0, -20, 0], rotate: [null, parseFloat(img.className.match(/-?\d+deg/)?.[0] || img.className.match(/rotate-(-?\d+)/)?.[1] || "0") + 2, null] }}
              transition={{ 
                duration: 20 + i * 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                opacity: { duration: 2, delay: i * 0.2 },
                scale: { duration: 2, delay: i * 0.2 }
              }}
            >
              <Image src={img.src} alt="Modern Family Memory" fill className="object-cover" sizes="(max-width: 768px) 60vw, 40vw" priority={i < 2} />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 hover:bg-transparent" />
            </motion.div>
          ))}
          
          {/* Main Center Image */}
          <motion.div 
            className="absolute z-10 w-[90vw] md:w-[50vw] h-[60vh] md:h-[70vh] max-w-[800px] opacity-100 overflow-hidden rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/20"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "easeInOut",
              opacity: { duration: 2, delay: 0.5 },
              scale: { duration: 2, delay: 0.5 }
            }}
          >
            <Image src="/images/Hero page pics/Center.webp" alt="Modern Family Centerpiece" fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
          </motion.div>
        </div>
        
        {/* Animated Gradient Overlays - Reduced to allow images to shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505] pointer-events-none" />
        <motion.div 
          className="absolute inset-0 bg-accent/10 mix-blend-overlay"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Subtle Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 blur-[1px]"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      {/* Soft dark radial behind text for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.7)_0%,transparent_60%)] pointer-events-none z-10" />

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center drop-shadow-2xl"
        style={{ y: textY, opacity }}
      >
        {/* Soft glowing lighting behind title */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/20 blur-[120px] rounded-full pointer-events-none z-[-1]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
          className="flex flex-col items-center"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            className="inline-block px-5 py-2 mb-8 text-[11px] font-semibold tracking-[0.4em] uppercase glass border border-white/10 rounded-full text-accent shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            A Cinematic Tribute
          </motion.div>

          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-4 text-white leading-[0.9]"
          >
            MODERN FAMILY
          </motion.h1>

          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] text-gradient mb-10 pl-2 md:pl-4"
          >
            UNIVERSE
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-light max-w-2xl text-center shadow-black/50"
          >
            Three families. One big, messy, hilarious life. <br className="hidden md:block" />
            Rediscover the journey that defined a generation in stunning detail.
          </motion.p>
          
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-accent hover:text-white transition-all duration-500 relative overflow-hidden group"
          >
            <span className="relative z-10">Enter Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Apple-style Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Bottom fade transition into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
}
