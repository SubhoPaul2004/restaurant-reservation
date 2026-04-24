const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Reservation = require('./models/Reservation');
const app = express();

// 1. DISABLE BUFFERING
// This stops Mongoose from waiting 10s when the connection isn't ready.
// It will throw an error immediately instead of hanging.
mongoose.set('bufferCommands', false);

// 2. CORS CONFIGURATION
app.use(cors({
  origin: ["http://localhost:5173", "https://restaurant-reservation-zeta.vercel.app"], 
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 3. DATABASE CONNECTION (Optimized for Serverless)
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log("🚀 Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

// Initialize connection
connectDB();

// 4. ROUTES
app.post('/api/reservations', async (req, res) => {
  try {
    // 1. THE GATEKEEPER: Wait until connection is fully established
    // mongoose.connection.readyState: 0 = disconnected, 1 = connected, 2 = connecting
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ DB not ready, waiting for connection...");
      await connectDB(); 
    }

    // 2. NOW execute the save
    const newBooking = new Reservation(req.body);
    const saved = await newBooking.save();
    
    console.log("✅ Reservation Saved:", saved._id);
    res.status(201).json({ success: true, message: "Confirmed!" });

  } catch (error) {
    console.error("❌ BACKEND ERROR:", error.message);
    
    // If it's still a connection issue, tell the user to retry
    if (error.name === 'MongooseError' || error.message.includes('initial connection')) {
      return res.status(503).json({ 
        success: false, 
        message: "Database warming up. Please try again in a moment." 
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/admin/reservations', async (req, res) => {
  try {
    await connectDB();
    const bookings = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch" });
  }
});

app.delete('/api/admin/reservations/:id', async (req, res) => {
  try {
    await connectDB();
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// 5. LISTEN BLOCK (Local Only)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local Server active on port ${PORT}`));
}

// CRITICAL: Export for Vercel
module.exports = app;