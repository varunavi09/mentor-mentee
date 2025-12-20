# 🎓 Mentor Connect

**A comprehensive mentoring platform connecting mentees with industry experts**

Mentor Connect is a web application designed to facilitate meaningful mentorship connections between candidates seeking career guidance and experienced professionals from various industries. The platform provides automated scheduling, video conferencing, and seamless communication tools.

---

## 🌟 Features

### 👨‍💼 For Mentors
- **Set Availability**: Define time slots when you're available for mentoring sessions
- **Manage Bookings**: View all booking requests from mentees
- **Accept/Decline Requests**: Review and respond to mentee requests
- **Video Sessions**: Join video calls with integrated chat functionality
- **Profile Management**: Showcase your expertise, experience, and industry background

### 👩‍🎓 For Mentees
- **Find Mentors**: Browse and search mentors by expertise and industry
- **Book Sessions**: Select available time slots and book mentoring sessions
- **Session Management**: Track pending, accepted, and completed sessions
- **Video Meetings**: Join video calls with mentors
- **Real-time Chat**: Communicate via text during sessions

### ⚙️ Common Features
- **User Authentication**: Secure login and registration system
- **Role-based Access**: Separate dashboards for mentors and mentees
- **Video Conferencing**: Integrated Jitsi Meet for high-quality video calls
- **Chat Functionality**: In-session text messaging for sharing links and resources
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

---

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Jitsi Meet API**: Video conferencing integration

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Additional Tools
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger

---

## 📋 Prerequisites

Before running this application, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
cd d:\mentor_mentee
```

### 2. Install Dependencies
```bash
npm install
npm install react-router-dom
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Ensure MongoDB is running on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update the connection string in `backend/server.js`:
  ```javascript
  const MONGO_URI = 'your-mongodb-atlas-connection-string';
  ```

### 4. Start the Backend Server
Open a terminal and run:
```bash
npm run server
```
The server will start on `http://localhost:5000`

### 5. Start the Frontend
Open another terminal and run:
```bash
npm start
```
The React app will open at `http://localhost:3000`

---

## 📖 Usage Guide

### For Mentees

1. **Register**
   - Go to the login page
   - Click "Sign up"
   - Select "Mentee" as your role
   - Fill in your details

2. **Find a Mentor**
   - Browse the list of available mentors
   - Use the search bar to filter by expertise or industry
   - Click on a mentor to view their profile

3. **Book a Session**
   - Select an available time slot
   - Add optional notes about what you'd like to discuss
   - Submit your booking request

4. **Join Session**
   - Once the mentor accepts, go to "My Bookings"
   - Click "Join Session" at the scheduled time
   - Use the integrated video call and chat features

### For Mentors

1. **Register**
   - Go to the login page
   - Click "Sign up"
   - Select "Mentor" as your role
   - Add your expertise, industry, and experience

2. **Set Availability**
   - Go to your dashboard
   - Select "Set Availability" tab
   - Choose dates and time slots when you're available

3. **Manage Bookings**
   - View incoming booking requests
   - Accept or decline based on your schedule
   - See mentee details and their questions

4. **Conduct Sessions**
   - Click "Join Session" for accepted bookings
   - Use video and chat to mentor effectively

---

## 🗂️ Project Structure

```
mentor_mentee/
├── backend/
│   ├── models/
│   │   ├── User.js           # User schema (mentor/mentee)
│   │   ├── Availability.js   # Availability slots schema
│   │   └── Booking.js        # Booking schema
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── mentor.js         # Mentor-specific routes
│   │   ├── mentee.js         # Mentee-specific routes
│   │   └── booking.js        # Booking management routes
│   └── server.js             # Express server setup
├── src/
│   ├── components/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Login.jsx         # Login/Registration
│   │   ├── MentorDashboard.jsx
│   │   ├── MenteeDashboard.jsx
│   │   └── VideoCall.jsx     # Video conferencing
│   ├── App.js                # Main app component
│   ├── App.css               # App styles
│   └── index.css             # Global styles
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Mentor Routes
- `POST /api/mentor/availability` - Add availability slot
- `GET /api/mentor/availability/:mentorId` - Get mentor's availability
- `DELETE /api/mentor/availability/:id` - Remove availability
- `GET /api/mentor/bookings/:mentorId` - Get mentor's bookings
- `PATCH /api/mentor/bookings/:bookingId` - Accept/decline booking

### Mentee Routes
- `GET /api/mentee/mentors` - Get all mentors
- `GET /api/mentee/mentors/:mentorId` - Get mentor details
- `GET /api/mentee/bookings/:menteeId` - Get mentee's bookings

### Booking Routes
- `POST /api/booking` - Create new booking
- `GET /api/booking/:bookingId` - Get booking details
- `DELETE /api/booking/:bookingId` - Cancel booking

---

## 🎥 Video Call Integration

The platform uses **Jitsi Meet** for video conferencing:
- **Zero configuration required** - works out of the box
- **End-to-end encryption**
- **Screen sharing support**
- **Built-in chat**
- **No account needed**

Each session gets a unique room ID based on the booking ID.

---

## 🎨 Customization

### Changing Time Slots
Edit `MentorDashboard.jsx` to modify available time slots:
```javascript
<option value="09:00 - 10:00">09:00 - 10:00</option>
// Add more options as needed
```

### Styling
- Global styles: `src/index.css`
- Component styles: Inline Tailwind classes
- Tailwind config: `tailwind.config.js`

---

## 🔐 Security Notes

⚠️ **Important**: This is a demonstration project. For production use:
- Implement proper password hashing (bcrypt)
- Add JWT authentication
- Use environment variables for sensitive data
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: MongoDB connection error
```
**Solution**: Ensure MongoDB is running or check your connection string

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change the port in `backend/server.js` or kill the process using port 5000

### Dependencies Not Found
```
Error: Cannot find module 'react-router-dom'
```
**Solution**: Run `npm install` again

---

## 🤝 Contributing

This project was built for the **Smart India Hackathon 2024** under Problem Statement ID **1630** for Punjab Skill Development Mission (PSDM).

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👥 Contact & Support

For questions or support, please contact the development team.

---

## 🎯 Future Enhancements

- Calendar integration (Google Calendar, Outlook)
- Email notifications
- Rating and review system
- Session recording
- Payment integration
- Mobile app
- AI-powered mentor matching
- Analytics dashboard

---

**Built with ❤️ for Punjab Skill Development Mission**
