"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CHARACTERS } from "@/data/constants";
import { cn } from "@/lib/utils";

export default function CharacterSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 bg-[#030303] relative overflow-hidden">
      {/* Background Texture/Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#030303] to-[#030303]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: titleY, opacity }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-6 block">The Cast</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">THE LEGENDS</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
        >
          {CHARACTERS.map((char) => (
            <motion.div
              key={char.name}
              variants={{
                hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } 
                }
              }}
              whileHover="hover"
              className="group relative h-[450px] md:h-[500px] rounded-[2rem] cursor-pointer"
            >
              {/* Animated Border Wrapper */}
              <div className="absolute -inset-[1px] rounded-[2rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_280deg,rgba(245,158,11,0.8)_360deg)]"
                />
              </div>

              {/* Card Container */}
              <div className="absolute inset-0 bg-[#0a0a0a] rounded-[2rem] overflow-hidden z-10 border border-white/5 shadow-2xl shadow-black group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-700 flex flex-col justify-end group-hover:-translate-y-2">
                
                {/* Image Container with Parallax Hover */}
                <div className="absolute inset-0 bg-neutral-900 transition-transform duration-1000 ease-[0.25,0.1,0.25,1] group-hover:scale-110">
                  <Image 
                    src={char.image} 
                    alt={char.name} 
                    fill 
                    className="object-cover object-top sm:object-center opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 overflow-hidden">
                    {char.tags.map((tag, i) => (
                      <motion.span 
                        key={tag} 
                        variants={{
                          initial: { opacity: 0, y: 10 },
                          hover: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.3 } }
                        }}
                        initial="initial"
                        className="px-3 py-1 text-[10px] uppercase tracking-widest glass-dark text-gray-300 border border-white/10 rounded-full shadow-lg"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Title & Role */}
                  <div className="transform transition-transform duration-700 ease-[0.25,0.1,0.25,1] group-hover:-translate-y-4">
                    <h3 className="text-4xl font-bold text-white mb-1 tracking-tight">
                      {char.name}
                    </h3>
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                      {char.role}
                    </p>
                  </div>
                  
                  {/* Description Expansion */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[0.25,0.1,0.25,1]">
                    <div className="overflow-hidden">
                      <p className="text-gray-400 text-sm leading-relaxed pb-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.25,0.1,0.25,1]">
                        {char.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Layered Depth Glow */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
