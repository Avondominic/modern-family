"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black py-32 px-6 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-32 max-w-4xl"
        >
          <blockquote className="text-4xl md:text-6xl font-serif italic text-white mb-10 leading-[1.2] tracking-tight">
            "We tell our stories so that we can be part of something bigger than ourselves."
          </blockquote>
          <p className="text-accent uppercase tracking-[0.4em] text-sm font-bold">— Jay Pritchett</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full pt-16 border-t border-white/5 items-center"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-left order-2 md:order-1"
          >
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">Explore</h4>
            <ul className="text-gray-500 space-y-4 text-sm tracking-wide">
              <li className="hover:text-white transition-colors cursor-pointer">Cast & Crew</li>
              <li className="hover:text-white transition-colors cursor-pointer">Episodes</li>
              <li className="hover:text-white transition-colors cursor-pointer">Soundtrack</li>
            </ul>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col items-center order-1 md:order-2"
          >
            <div className="text-4xl font-bold tracking-tighter text-white mb-8">
              MF<span className="text-accent">.</span>U
            </div>
            <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-gray-500 font-semibold">
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            </div>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-right order-3 flex flex-col justify-end h-full"
          >
            <p className="text-gray-500 text-sm mb-4 tracking-wide">Crafted for the fans.</p>
            <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em]">© 2024 Modern Family Universe Experience</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
