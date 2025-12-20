# 🎓 Mentor Connect - Application Flow

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                           │
│  (React Frontend - Port 3000)                               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Home      │  │    Login     │  │   Register   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐ │
│  │  Mentor Dashboard       │  │  Mentee Dashboard       │ │
│  │  - Set Availability     │  │  - Find Mentors         │ │
│  │  - View Bookings        │  │  - Book Sessions        │ │
│  │  - Accept/Decline       │  │  - My Bookings          │ │
│  └─────────────────────────┘  └─────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Video Call (Jitsi Meet + Chat)             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND SERVER                             │
│  (Express.js - Port 5000)                                   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │  Mentor  │  │  Mentee  │  │ Booking  │  │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Routes  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE                                 │
│  (MongoDB - Port 27017)                                     │
│                                                              │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐             │
│  │   Users  │  │ Availability │  │ Bookings │             │
│  └──────────┘  └──────────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 User Flows

### Mentor Flow

```
1. Registration
   ↓
2. Login
   ↓
3. Set Availability (Add time slots)
   ↓
4. Wait for Booking Requests
   ↓
5. Review Requests → Accept/Decline
   ↓
6. Join Video Session (at scheduled time)
   ↓
7. End Session
```

### Mentee Flow

```
1. Registration
   ↓
2. Login
   ↓
3. Browse Mentors (Search by expertise)
   ↓
4. Select Mentor → View Profile
   ↓
5. Choose Available Time Slot
   ↓
6. Book Session (Add notes)
   ↓
7. Wait for Acceptance
   ↓
8. Join Video Session (when accepted)
   ↓
9. End Session
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  role: "mentor" | "mentee",
  expertise: [String],      // For mentors
  bio: String,              // For mentors
  yearsOfExperience: Number, // For mentors
  industry: String,         // For mentors
  createdAt: Date
}
```

### Availability Collection
```javascript
{
  _id: ObjectId,
  mentorId: ObjectId (ref: User),
  date: String (YYYY-MM-DD),
  timeSlot: String (HH:MM - HH:MM),
  isBooked: Boolean,
  createdAt: Date
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  mentorId: ObjectId (ref: User),
  menteeId: ObjectId (ref: User),
  availabilityId: ObjectId (ref: Availability),
  date: String,
  timeSlot: String,
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled",
  notes: String,
  meetingLink: String,
  createdAt: Date
}
```

## 🔐 Authentication Flow

```
1. User enters credentials
   ↓
2. Frontend sends POST to /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. If valid: Return user object
   ↓
5. Frontend stores in localStorage
   ↓
6. Redirect to appropriate dashboard
```

## 🎥 Video Call Flow

```
1. User clicks "Join Session"
   ↓
2. Frontend navigates to /video-call/:bookingId
   ↓
3. Fetch booking details
   ↓
4. Initialize Jitsi Meet with unique room
   ↓
5. Load video interface
   ↓
6. Enable chat functionality
   ↓
7. User can end call anytime
```

## 📱 Component Hierarchy

```
App.js (Main Router)
│
├── Home.jsx (Landing Page)
│
├── Login.jsx (Auth)
│   ├── Login Form
│   └── Registration Form
│
├── MentorDashboard.jsx
│   ├── Set Availability Tab
│   │   ├── Add Slot Form
│   │   └── Current Slots List
│   └── View Bookings Tab
│       └── Bookings Table
│
├── MenteeDashboard.jsx
│   ├── Find Mentor Tab
│   │   ├── Search Bar
│   │   ├── Mentors Grid
│   │   └── Mentor Detail + Booking
│   └── My Bookings Tab
│       └── Bookings Table
│
└── VideoCall.jsx
    ├── Header
    ├── Jitsi Video Container
    └── Chat Sidebar
        ├── Messages List
        └── Message Input
```

## 🌐 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in

### Mentor Operations
- `POST /api/mentor/availability` - Add time slot
- `GET /api/mentor/availability/:mentorId` - Get slots
- `DELETE /api/mentor/availability/:id` - Remove slot
- `GET /api/mentor/bookings/:mentorId` - Get bookings
- `PATCH /api/mentor/bookings/:bookingId` - Update booking status

### Mentee Operations
- `GET /api/mentee/mentors` - List all mentors
- `GET /api/mentee/mentors/:mentorId` - Get mentor details
- `GET /api/mentee/bookings/:menteeId` - Get my bookings

### Booking Operations
- `POST /api/booking` - Create booking
- `GET /api/booking/:bookingId` - Get booking details
- `DELETE /api/booking/:bookingId` - Cancel booking

## 🎨 Technology Stack Details

### Frontend Technologies
- **React 19** - UI Library
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Jitsi Meet External API** - Video calls

### Backend Technologies
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin requests
- **Helmet** - Security headers
- **Morgan** - Request logging

### Development Tools
- **npm** - Package manager
- **MongoDB** - Database
- **Git** - Version control

## 📊 Data Flow Examples

### Booking a Session
```
1. Mentee selects time slot
   → POST /api/booking
   → Body: { mentorId, menteeId, availabilityId, date, timeSlot }

2. Backend creates booking (status: pending)
   → Updates availability (isBooked: true)
   → Returns booking object

3. Frontend updates UI
   → Shows success message
   → Switches to "My Bookings" tab
```

### Accepting a Booking
```
1. Mentor clicks "Accept"
   → PATCH /api/mentor/bookings/:bookingId
   → Body: { status: "accepted" }

2. Backend updates booking status
   → Returns updated booking

3. Frontend refreshes bookings list
   → Shows "Join Session" button
```

## 🔒 Security Considerations (For Production)

⚠️ Current implementation is for demonstration. For production:

1. **Password Security**
   - Hash passwords with bcrypt
   - Implement password strength validation

2. **Authentication**
   - Use JWT tokens
   - Implement token refresh mechanism
   - Add session management

3. **Data Validation**
   - Validate all inputs
   - Sanitize user data
   - Implement rate limiting

4. **Environment Variables**
   - Store sensitive data in .env
   - Use different configs for dev/prod

5. **HTTPS**
   - Use SSL certificates
   - Secure API endpoints

---

This architecture provides a scalable, maintainable foundation for the Mentor Connect platform! 🚀
