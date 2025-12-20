const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Availability = require('../models/Availability');
const Booking = require('../models/Booking');

// Get all mentors
router.get('/mentors', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(mentors);
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
});

// Get mentor details with availability
router.get('/mentors/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await User.findById(mentorId).select('-password');
    const availability = await Availability.find({ mentorId, isBooked: false })
      .sort({ date: 1, timeSlot: 1 });
    
    res.json({ mentor, availability });
  } catch (error) {
    console.error('Get mentor details error:', error);
    res.status(500).json({ error: 'Failed to fetch mentor details' });
  }
});

// Get mentee's bookings
router.get('/bookings/:menteeId', async (req, res) => {
  try {
    const { menteeId } = req.params;
    const bookings = await Booking.find({ menteeId })
      .populate('mentorId', 'name email expertise industry')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;
