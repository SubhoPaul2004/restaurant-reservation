import React, { useRef, useMemo } from "react";
import { Toaster } from 'sonner'; 
import { motion, useScroll, useTransform } from "framer-motion";

// Assets
import instagramIcon from "./assets/instagram_icon.png";
import facebookIcon from "./assets/facebook_icon.png";
import heroBgImage from "./assets/hero-food.jpg";

// Components
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Branches from "./components/Branches";
import Offers from "./components/Offers";
import Booking from "./components/Booking";
import Gallery from "./components/Gallery";

const SparkleLayer = () => {
  const sparkles = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 10,
    })), []
  );

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.7, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const BlobLayer = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-orange-500/50 blur-[80px]"
        animate={{
          x: [-200, 300, 100, -200],
          y: [-100, 200, 400, -100],
          scale: [1, 1.4, 0.8, 1],
          rotate: [0, 90, 180, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '5%', left: '10%' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-amber-400/40 blur-[90px]"
        animate={{
          x: [200, -400, 0, 200],
          y: [300, -200, 100, 300],
          scale: [1, 0.7, 1.3, 1],
          rotate: [0, -120, -240, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: '10%', right: '10%' }}
      />
    </div>
  );
};

function App() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    const element = document.getElementById('book-table');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-orange-500/30" ref={ref}>
      <Toaster position="top-center" richColors theme="dark" />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden"
      >
        <BlobLayer />
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-soft-light grayscale-[20%]"
            style={{ backgroundImage: `url(${heroBgImage})` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_85%)]" />
        </motion.div>
        <SparkleLayer />
        
        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-white"
              animate={{ scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              Taste <br /> 
              <span className="relative inline-block text-orange-500 italic">
                Excellence.
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: [0.45, 0, 0.55, 1] }}
                  style={{ mixBlendMode: 'overlay' }}
                />
              </span>
            </motion.h1>
            
            <motion.p className="mt-8 text-gray-300 text-lg md:text-xl font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto">
              A Symphony of Flavors Awaits You
            </motion.p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={scrollToBooking}
                className="bg-orange-500 px-12 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] transition-all transform hover:scale-105 active:scale-95"
              >
                Reserve a Table
              </button>
              <button 
                onClick={scrollToMenu}
                className="border border-white/20 px-12 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all backdrop-blur-md"
              >
                View Our Menu
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent" />
        </motion.div>
      </section>

      {/* --- CONTENT SECTIONS --- */}
      <div className="relative z-10 bg-[#020617]">
         <Menu />
         <Booking />
         <Branches />
         <Offers />
         <Gallery />
      </div>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-20 bg-[#020617] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4 tracking-tighter uppercase">Pizzario.</h2>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest">
              Crafting Culinary Memories <br /> Since 2026
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2">Direct Line</h3>
            <p className="text-gray-400 font-mono">+91 9988776655</p>
            <p className="text-gray-400 font-mono">hello@pizzario.in</p>
          </div>

          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-orange-500 transition-all">
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5 object-contain" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-orange-500 transition-all">
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center text-gray-500 text-[10px] tracking-[0.5em] uppercase">
          ©Made by Subhojit Paul | 2026
        </div>
      </footer>
    </div>
  );
}

export default App;