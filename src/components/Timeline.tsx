"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { TIMELINE } from "@/data/constants";

function TimelineCard({ item, index, total }: { item: any; index: number; total: number }) {
  return (
    <motion.div 
      className="flex-shrink-0 w-[85vw] sm:w-[450px] md:w-[650px] h-[400px] md:h-[450px] relative group"
      initial={{ opacity: 0, y: 100, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Node on the Timeline */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: 48 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className="w-[2px] bg-gradient-to-b from-accent/50 to-transparent mb-2 group-hover:from-accent transition-colors duration-500" 
        />
        <div className="w-5 h-5 rounded-full bg-[#050505] border-2 border-white/20 group-hover:border-accent group-hover:scale-[2] group-hover:shadow-[0_0_30px_rgba(245,158,11,1)] transition-all duration-700 z-10" />
      </div>

      {/* Floating Wrapper for continuous idle motion */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {/* Moment Card */}
        <div className="w-full h-full glass-dark p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-accent/40 hover:bg-[#0a0a0a] transition-all duration-700 overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.6)] group-hover:shadow-[0_40px_80px_rgba(245,158,11,0.15)] cursor-pointer flex flex-col justify-end group-hover:-translate-y-6">
          
          {/* Background Image (if present) */}
          {item.image && (
            <div className="absolute inset-0 z-0 opacity-100 md:opacity-40 md:group-hover:opacity-70 transition-opacity duration-1000">
              <Image 
                src={item.image} 
                alt={item.event} 
                fill 
                className="object-cover object-top sm:object-center mix-blend-normal md:mix-blend-luminosity md:group-hover:mix-blend-normal md:group-hover:scale-110 transition-all duration-1000 ease-[0.25,0.1,0.25,1]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Mobile-Only Scroll Glow Overlay */}
              <motion.div 
                className="absolute inset-0 backdrop-grayscale bg-black/60 md:hidden pointer-events-none z-10"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ margin: "-30%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-80 z-10" />
            </div>
          )}

          {/* Massive Background Number */}
          <div className="absolute -top-12 -right-12 text-[18rem] font-bold text-white/[0.015] group-hover:text-accent/[0.05] group-hover:scale-110 transition-all duration-1000 select-none pointer-events-none leading-none tracking-tighter z-0">
            0{index + 1}
          </div>

          {/* Cinematic Glow on Hover */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/30 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" />

          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] text-white uppercase border border-white/10 group-hover:border-accent/30 group-hover:text-accent transition-colors duration-500">
                {item.season}
              </span>
              <span className="text-gray-500 text-xs tracking-widest font-mono group-hover:text-gray-300 transition-colors duration-500">
                {item.year}
              </span>
            </motion.div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter group-hover:text-accent transition-colors duration-500 leading-tight">
              {item.event}
            </h3>
            
            <div className="h-[2px] w-12 bg-white/20 mb-8 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-transparent transition-all duration-1000 ease-[0.25,0.1,0.25,1]" />

            <p className="text-gray-400 font-light leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-500">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate container transform
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
  // Progression line fills up as we scroll
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-[#020202]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Dramatic Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-[#020202] to-[#020202] pointer-events-none z-0" />

        {/* Section Header */}
        <div className="absolute top-16 md:top-20 left-6 md:left-24 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-2">The Story So Far</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter">ICONIC MOMENTS</h2>
          </motion.div>
        </div>

        {/* Main Progression Line */}
        <div className="absolute top-1/2 -translate-y-[280px] left-0 w-full h-[2px] bg-white/5 z-10">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-600 via-accent to-yellow-400 shadow-[0_0_20px_rgba(245,158,11,0.8)] origin-left"
            style={{ scaleX: progressWidth }}
          />
        </div>

        {/* Scrolling Container */}
        <motion.div style={{ x }} className="flex w-max items-center gap-16 md:gap-32 px-12 md:px-24 mt-20 relative z-20">
          {TIMELINE.map((item, index) => (
            <TimelineCard 
              key={item.season} 
              item={item} 
              index={index} 
              total={TIMELINE.length} 
            />
          ))}
          
          {/* Final Spacer to ensure last card scrolls to center */}
          <div className="flex-shrink-0 w-[50vw]" />
        </motion.div>
        
        {/* Vignette Overlay for Cinematic Feel */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)] z-30" />
      </div>
    </section>
  );
}
