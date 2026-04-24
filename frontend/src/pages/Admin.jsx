import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Users, Calendar, Clock } from 'lucide-react';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/reservations');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/api/admin/reservations/${id}`, { method: 'DELETE' });
      setBookings(bookings.filter(b => b._id !== id));
      toast.success("Reservation removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">
          Reservation <span className="text-orange-500">Dashboard</span>
        </h1>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                <th className="p-6">Customer</th>
                <th className="p-6">Date/Time</th>
                <th className="p-6">Guests</th>
                <th className="p-6">Branch</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="font-bold">{b.fullName}</div>
                    <div className="text-xs text-gray-500">{b.phoneNumber}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2"><Calendar size={14}/> {b.date}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm"><Clock size={14}/> {b.time}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2"><Users size={14}/> {b.totalGuests}</div>
                    <div className="text-[10px] text-gray-500">V:{b.vegCount} | NV:{b.nonVegCount}</div>
                  </td>
                  <td className="p-6 font-medium text-orange-500">{b.branch}</td>
                  <td className="p-6">
                    <button onClick={() => deleteBooking(b._id)} className="text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-500 uppercase tracking-widest text-xs">No reservations found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;