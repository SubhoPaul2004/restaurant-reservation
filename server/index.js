const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Reservation = require('./models/Reservation');
const app = express();

// --- 1. FIX CORS ---
// You must allow your Vercel URL, not just localhost
app.use(cors({
  origin: ["http://localhost:5173", "https://restaurant-reservation-zeta.vercel.app"], // Add your actual Vercel URL here
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(express.json());

// --- 2. DATABASE CONNECTION ---
const uri = process.env.MONGO_URI;
// Added options for better stability in serverless environments
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("🚀 Connected to MongoDB"))
  .catch(err => console.error("❌ Connection Error:", err));

// --- 3. ROUTES ---
app.post('/api/reservations', async (req, res) => {
  try {
    const newBooking = new Reservation(req.body);
    await newBooking.save();
    res.status(201).json({ success: true, message: "Confirmed!" });
  } catch (error) {
    console.error("❌ BACKEND ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/admin/reservations', async (req, res) => {
  try {
    const bookings = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch" });
  }
});

app.delete('/api/admin/reservations/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// --- 4. FIX THE LISTEN BLOCK ---
// Vercel handles the port. If we force port 5000, it will fail on Vercel.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local Server active on port ${PORT}`));
}

// CRITICAL: Export for Vercel
module.exports = app;