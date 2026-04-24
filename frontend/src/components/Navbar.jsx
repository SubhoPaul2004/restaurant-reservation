import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (id) => {
    setIsOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Menu", id: "menu" },
    { name: "Branches", id: "branches-list" },
    { name: "Offers", id: "offers" },
    { name: "Gallery", id: "gallery" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo - Scrolls to Top */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-orange-500 font-bold text-2xl cursor-pointer group"
        >
          <UtensilsCrossed size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="tracking-tighter text-white">PIZZARIO</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-400 hover:text-orange-500 text-sm font-semibold uppercase tracking-widest transition-all relative group"
            >
              {item.name}
              {/* Subtle underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        {/* CTA Button */}
<div className="hidden md:block">
  <button 
    onClick={() => scrollToSection("contact")} // Update ID to "contact"
    className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
  >
    Contact Us
  </button>
</div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-[#020617] border-b border-white/5 p-8 flex flex-col gap-6 text-center md:hidden overflow-hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-black text-white uppercase tracking-tighter hover:text-orange-500 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("book-table")}
              className="bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;