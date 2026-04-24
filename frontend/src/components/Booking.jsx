import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { branchesData } from '../data/branches';
import { toast } from 'sonner';

const Booking = () => {
  // 1. States
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [mealType, setMealType] = useState('Dinner');
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:00 PM");
  const [vegCount, setVegCount] = useState(0);
  const [nonVegCount, setNonVegCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper to get today's date in YYYY-MM-DD format for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  const timings = {
    Lunch: ["12:30 PM", "01:30 PM", "02:30 PM", "03:30 PM"],
    Dinner: ["07:00 PM", "08:30 PM", "09:30 PM", "10:30 PM"]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDATION ---
    if (!selectedBranch) {
      return toast.error("Please select a branch location");
    }
    if (phoneNumber.length !== 10) {
      return toast.error("Phone number must be exactly 10 digits");
    }
    if (vegCount + nonVegCount === 0) {
      return toast.error("Please add at least one guest");
    }
    if (!date) {
      return toast.error("Please select a date");
    }

    setLoading(true);

    const reservationData = {
      fullName,
      phoneNumber,
      branch: selectedBranch,
      mealType,
      date,
      time,
      vegCount,
      nonVegCount,
      totalGuests: vegCount + nonVegCount
    };

    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Reservation Confirmed!", {
          description: `Table for ${vegCount + nonVegCount} at ${selectedBranch}`
        });
        setIsSubmitted(true);
      } else {
        toast.error(data.message || "Failed to save reservation");
      }
    } catch (err) {
      console.error("Connection Refused:", err);
      toast.error("Server is offline!", {
        description: "Check if your backend server is running on port 5000."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book-table" className="py-24 bg-[#020617] px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Book Your <span className="text-orange-500">Spot</span>
          </h2>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form key="f" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Column 1: Identity */}
                <div className="space-y-6">
                  <input required type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-orange-500 transition-all" />
                  
                  <input required type="tel" placeholder="10-Digit Phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-orange-500 transition-all" />
                  
                  <select required value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none cursor-pointer focus:border-orange-500 transition-all">
                    <option value="" disabled>Select Branch</option>
                    {branchesData.map((branch) => (
                      <option key={branch.id} value={branch.location} className="bg-[#020617]">{branch.location}</option>
                    ))}
                  </select>
                </div>

                {/* Column 2: Timing */}
                <div className="space-y-6">
                  <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-white/5">
                    {['Lunch', 'Dinner'].map((t) => (
                      <button 
                        key={t} 
                        type="button" 
                        onClick={() => {
                          setMealType(t);
                          setTime(timings[t][0]); 
                        }} 
                        className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${mealType === t ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  
                  {/* DATE INPUT WITH MIN ATTRIBUTE TO BLOCK PAST DATES */}
                  <input 
                    required 
                    type="date" 
                    min={today} 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white [color-scheme:dark] outline-none" 
                  />
                  
                  <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none">
                    {timings[mealType].map(t => <option key={t} value={t} className="bg-[#020617]">{t}</option>)}
                  </select>
                </div>

                {/* Column 3: Guests */}
                <div className="bg-white/5 p-6 rounded-3xl space-y-6 border border-white/5">
                  <div className="flex justify-between items-center text-white">
                    <span>Veg Guests</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setVegCount(Math.max(0, vegCount - 1))} className="w-8 h-8 rounded-full border border-white/10">-</button>
                      <span>{vegCount}</span>
                      <button type="button" onClick={() => setVegCount(vegCount + 1)} className="w-8 h-8 rounded-full border border-white/10">+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span>Non-Veg</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setNonVegCount(Math.max(0, nonVegCount - 1))} className="w-8 h-8 rounded-full border border-white/10">-</button>
                      <span>{nonVegCount}</span>
                      <button type="button" onClick={() => setNonVegCount(nonVegCount + 1)} className="w-8 h-8 rounded-full border border-white/10">+</button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between text-gray-500 uppercase text-[10px] tracking-widest font-bold">
                    <span>Total Guests</span>
                    <span className="text-orange-500">{vegCount + nonVegCount}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="lg:col-span-3 bg-orange-500 text-white font-black py-5 rounded-2xl uppercase tracking-[0.4em] hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                  {loading ? "Confirming..." : `Confirm ${mealType} Booking`}
                </button>
              </motion.form>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <CheckCircle2 className="mx-auto mb-6 text-green-500" size={80} />
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Reservation Success!</h3>
                <p className="text-gray-500 mt-2 uppercase tracking-widest text-[10px]">We'll see you at Pizzario {selectedBranch}</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-orange-500 text-xs font-bold uppercase tracking-widest border-b border-orange-500/20">Book Another Table</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Booking;