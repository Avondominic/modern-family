"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FAMILIES } from "@/data/constants";
import { cn } from "@/lib/utils";

export default function FamilyOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-4 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Background Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ y }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-[150px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24"
        >
          <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">The Legacy</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">THE BRANCHES</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Each house brings its own brand of chaos, love, and unforgettable moments to the table.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {FAMILIES.map((family) => (
            <motion.div
              key={family.id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
              }}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative"
            >
              <div className={cn(
                "absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-700 blur-xl rounded-2xl z-0",
                family.accent
              )} />
              
              <div className="relative glass-dark p-8 md:p-12 rounded-[2rem] border border-white/5 h-[400px] md:h-[450px] flex flex-col justify-end z-10 overflow-hidden bg-black/80 group-hover:border-white/10 transition-all duration-700 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-100 md:opacity-30 md:group-hover:opacity-60 transition-opacity duration-700">
                  <Image 
                    src={family.image} 
                    alt={family.name} 
                    fill 
                    className="object-cover object-top sm:object-center mix-blend-normal md:mix-blend-luminosity md:group-hover:mix-blend-normal md:group-hover:scale-110 transition-all duration-1000 ease-[0.25,0.1,0.25,1]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Mobile-Only Scroll Glow Overlay */}
                  <motion.div 
                    className="absolute inset-0 backdrop-grayscale bg-black/60 md:hidden pointer-events-none z-10"
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 0 }}
                    viewport={{ margin: "-30%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />
                </div>
                
                {/* Subtle Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-accent/20 transition-colors duration-1000 pointer-events-none z-0" />
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold mb-4 text-white group-hover:text-accent tracking-tight transition-colors duration-500">
                    {family.name}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {family.description}
                  </p>
                </div>
                

              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
