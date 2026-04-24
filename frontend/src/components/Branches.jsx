import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star } from 'lucide-react';
import { branchesData } from '../data/branches';

const Branches = () => {
  return (
    <section id="branches-list" className="py-24 bg-[#020617] px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            Our <span className="text-orange-500">Outlets</span>
          </motion.h2>
          <p className="text-gray-500 mt-4 tracking-[0.2em] text-xs uppercase">Find the Pizzario nearest to you</p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branchesData.map((branch) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-orange-500/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={branch.image} 
                  alt={branch.location} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {branch.city}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-orange-500 transition-colors">
                  {branch.location}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <MapPin size={16} className="text-orange-500 shrink-0 mt-1" />
                    <p>{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Phone size={16} className="text-orange-500" />
                    <p>{branch.phone}</p>
                  </div>
                </div>

                {/* Vibe Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {branch.vibes.map((vibe) => (
                    <span key={vibe} className="text-[9px] font-bold text-gray-500 border border-white/10 px-2 py-1 rounded uppercase tracking-tighter">
                      {vibe}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/${branch.address}`, '_blank')}
                  className="w-full py-4 border border-orange-500/50 text-orange-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0)] hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                >
                  Locate on Map
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;