const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');
const Booking = require('../models/Booking');

// Set availability
router.post('/availability', async (req, res) => {
  try {
    const { mentorId, date, timeSlot } = req.body;

    const availability = new Availability({
      mentorId,
      date,
      timeSlot
    });

    await availability.save();
    res.status(201).json({ message: 'Availability added successfully', availability });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This time slot is already added' });
    }
    console.error('Availability error:', error);
    res.status(500).json({ error: 'Failed to add availability' });
  }
});

// Get mentor's availability
router.get('/availability/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const availability = await Availability.find({ mentorId, isBooked: false }).sort({ date: 1, timeSlot: 1 });
    res.json(availability);
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// Delete availability slot
router.delete('/availability/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Availability.findByIdAndDelete(id);
    res.json({ message: 'Availability removed successfully' });
  } catch (error) {
    console.error('Delete availability error:', error);
    res.status(500).json({ error: 'Failed to delete availability' });
  }
});

// Get mentor's bookings
router.get('/bookings/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const bookings = await Booking.find({ mentorId })
      .populate('menteeId', 'name email')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Accept/Decline booking
router.patch('/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate('menteeId', 'name email');

    // If declined, free up the availability slot
    if (status === 'declined') {
      await Availability.findByIdAndUpdate(booking.availabilityId, { isBooked: false });
    }

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

module.exports = router;
