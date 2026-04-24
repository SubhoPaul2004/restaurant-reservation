const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Reservation = require('./models/Reservation');
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"],
  credentials: true
}));

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("🚀 Connected to MongoDB"))
  .catch(err => console.error("❌ Connection Error:", err));

app.post('/api/reservations', async (req, res) => {
  try {
    console.log("📥 Received from Frontend:", req.body); // Check if data arrived
    
    const newBooking = new Reservation(req.body);
    const saved = await newBooking.save();
    
    console.log("✅ Saved successfully:", saved._id);
    res.status(201).json({ success: true, message: "Confirmed!" });
  } catch (error) {
    // THIS LINE IS THE KEY
    console.error("❌ BACKEND CRASH REASON:", error.message);
    
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + error.message 
    });
  }
});
app.get('/api/admin/reservations', async (req, res) => {
  try {
    const bookings = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Optional: Delete a reservation
app.delete('/api/admin/reservations/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});


const PORT = 5000; 
app.listen(PORT, () => console.log(`🚀 Backend active on port ${PORT}`));