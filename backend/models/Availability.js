const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true // Format: YYYY-MM-DD
  },
  timeSlot: {
    type: String,
    required: true // Format: HH:MM - HH:MM (e.g., "10:00 - 11:00")
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index to prevent duplicate slots
availabilitySchema.index({ mentorId: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);
