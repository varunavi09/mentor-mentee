const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-name.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  }
});

// Middleware
app.use(helmet());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
// Note: Ensure the DB name matches the seeding script (mentor-connect)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mentor-connect';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const mentorRoutes = require('./routes/mentor');
const menteeRoutes = require('./routes/mentee');
const bookingRoutes = require('./routes/booking');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/mentee', menteeRoutes);
app.use('/api/booking', bookingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Socket.IO chat for video sessions (room per bookingId)
io.on('connection', (socket) => {
  socket.on('join-room', ({ bookingId, user }) => {
    if (!bookingId) return;
    socket.join(bookingId);
    socket.data.user = user || {};
    io.to(bookingId).emit('system', { type: 'join', user, at: Date.now() });
  });

  socket.on('chat-message', ({ bookingId, message }) => {
    if (!bookingId || !message || !message.text) return;
    const payload = {
      id: message.id || Date.now(),
      sender: message.sender,
      senderId: message.senderId,
      text: message.text,
      timestamp: message.timestamp || new Date().toLocaleTimeString()
    };
    io.to(bookingId).emit('chat-message', payload);
  });

  socket.on('typing', ({ bookingId, user, isTyping }) => {
    if (!bookingId) return;
    socket.to(bookingId).emit('typing', { user, isTyping });
  });

  socket.on('disconnect', () => {
    // optional: could broadcast a leave event if bookingId was tracked
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server, io };
