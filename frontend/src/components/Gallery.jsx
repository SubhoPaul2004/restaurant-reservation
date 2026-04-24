import React from 'react';
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800",
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#020617] px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              #Pizzario<span className="text-orange-500 text-2xl ml-2 italic">Vibes</span>
            </h2>
            <p className="text-gray-500 mt-2 uppercase tracking-widest text-xs">Our community's favorite moments</p>
          </div>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 font-bold border-b-2 border-orange-500/20 hover:border-orange-500 transition-all pb-1 uppercase tracking-widest text-xs inline-block"
          >
            Follow on Instagram
          </a>
        </div>

        {/* Stable Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group aspect-square overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900"
            >
              <img 
                src={src} 
                alt="Pizzario Vibe" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800";
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-black text-sm tracking-widest uppercase">@pizzario_india</p>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;