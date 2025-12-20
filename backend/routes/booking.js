const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Availability = require('../models/Availability');

// Create booking
router.post('/', async (req, res) => {
  try {
    const { mentorId, menteeId, availabilityId, date, timeSlot, notes } = req.body;

    // Check if slot is still available
    const availability = await Availability.findById(availabilityId);
    if (!availability || availability.isBooked) {
      return res.status(400).json({ error: 'This time slot is no longer available' });
    }

    // Create booking
    const booking = new Booking({
      mentorId,
      menteeId,
      availabilityId,
      date,
      timeSlot,
      notes: notes || '',
      status: 'pending'
    });

    await booking.save();

    // Mark availability as booked
    availability.isBooked = true;
    await availability.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('mentorId', 'name email expertise')
      .populate('menteeId', 'name email');

    res.status(201).json({ message: 'Booking created successfully', booking: populatedBooking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get booking by ID
router.get('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate('mentorId', 'name email expertise industry')
      .populate('menteeId', 'name email');
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Cancel booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Free up the availability slot
    await Availability.findByIdAndUpdate(booking.availabilityId, { isBooked: false });
    
    // Delete or mark as cancelled
    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;
