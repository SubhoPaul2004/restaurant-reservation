import React from 'react';
import { motion } from 'framer-motion';
import { TicketPercent, Zap, Flame, Gift } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: "Corporate Lunch",
    discount: "25% OFF",
    code: "OFFICE25",
    desc: "Valid on tables of 5 or more at Gurgaon & Bangalore branches. Mon-Fri, 12 PM - 4 PM.",
    color: "from-blue-600 to-cyan-400",
    icon: <Zap size={24} />
  },
  {
    id: 2,
    title: "Midnight Pizza",
    discount: "BUY 1 GET 1",
    code: "PIZZA26",
    desc: "Order any large pizza and get a medium one free. Valid for Mumbai & Delhi after 11 PM.",
    color: "from-orange-600 to-red-500",
    icon: <Flame size={24} />
  },
  {
    id: 3,
    title: "First Table",
    discount: "₹500 OFF",
    code: "WELCOME",
    desc: "Get an instant discount on your first reservation through the app. No minimum bill.",
    color: "from-purple-600 to-pink-500",
    icon: <Gift size={24} />
  }
];

const Offers = () => {
  return (
    <section id="offers" className="py-24 bg-[#020617] px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-orange-500/30 text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
          >
            Exclusive Deals
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter"
          >
            Hot <span className="text-orange-500">Offers</span>
          </motion.h2>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm"
            >
              {/* Animated Background Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />
              
              <div className="relative z-10">
                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center text-white mb-8 shadow-xl`}>
                  {offer.icon}
                </div>
                
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">{offer.title}</h3>
                <h4 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter italic">
                  {offer.discount}
                </h4>
                <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
                  {offer.desc}
                </p>
                
                {/* Coupon Code Box */}
                <div className="flex items-center justify-between bg-black/40 p-5 rounded-2xl border border-white/5 group-hover:border-orange-500/40 transition-all">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Use Code</p>
                    <span className="text-lg font-mono text-white font-black tracking-widest">{offer.code}</span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(offer.code);
                      alert("Code Copied!");
                    }}
                    className="bg-white/10 hover:bg-orange-500 text-white p-3 rounded-xl transition-all"
                  >
                    <TicketPercent size={20} />
                  </button>
                </div>
              </div>

              {/* Decorative Diagonal Line */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;