const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true 
  },
  phoneNumber: { 
    type: String, 
    required: [true, "Phone is required"],
    match: [/^\d{10}$/, "Please provide a valid 10-digit number"] // Validation!
  },
  branch: { type: String, required: true },
  mealType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  vegCount: { type: Number, min: 0 },
  nonVegCount: { type: Number, min: 0 },
  totalGuests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Reservation', ReservationSchema);