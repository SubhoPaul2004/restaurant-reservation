import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '../data/menu';

const Menu = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  const filteredMenu = filter === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === filter);

  return (
    <section id="menu" className="py-24 bg-[#020617] px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter"
          >
            Our <span className="text-orange-500">Culinary</span> Selection
          </motion.h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-light">Explore our curated dishes before you arrive</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                filter === cat 
                ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]' 
                : 'border-white/10 text-gray-500 hover:border-orange-500/50 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredMenu.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative flex flex-col sm:flex-row gap-6 bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative w-full sm:w-36 h-36 overflow-hidden rounded-2xl shrink-0 shadow-2xl">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                  />
                  {/* Subtle overlay on image hover */}
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      {/* Indian Veg/Non-Veg Icon */}
                      <div className={`w-4 h-4 border-2 ${item.sub === 'Veg' ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
                         <div className={`w-2 h-2 rounded-full ${item.sub === 'Veg' ? 'bg-green-600' : 'bg-red-600'}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-orange-500 transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                    <span className="text-orange-500 font-black text-xl italic">{item.price}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                  
                  {/* Category Badge */}
                  <div className="mt-4 flex items-center">
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] px-3 py-1 border border-white/10 rounded-full group-hover:border-orange-500/20 group-hover:text-gray-400 transition-all">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;