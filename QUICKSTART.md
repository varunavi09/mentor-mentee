# Mentor Connect - Quick Start

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```powershell
npm install
npm install react-router-dom
```

### Step 2: Start Backend Server
```powershell
npm run server
```
Leave this terminal running. The backend will start on `http://localhost:5000`

### Step 3: Start Frontend (New Terminal)
```powershell
npm start
```
The app will automatically open at `http://localhost:3000`

---

## ✅ Testing the Application

### Test Accounts to Create

**Mentor Account:**
- Name: John Smith
- Email: john@mentor.com
- Password: password123
- Role: Mentor
- Expertise: Software Development, Career Guidance
- Industry: Technology
- Years of Experience: 10

**Mentee Account:**
- Name: Sarah Johnson
- Email: sarah@mentee.com
- Password: password123
- Role: Mentee

### Testing Workflow

1. **Register a Mentor**
   - Go to login page → Sign up
   - Fill mentor details
   - Login as mentor

2. **Set Availability**
   - Go to "Set Availability" tab
   - Add 2-3 time slots for upcoming dates

3. **Register a Mentee (use another browser/incognito)**
   - Sign up as mentee
   - Login as mentee

4. **Book a Session**
   - Browse mentors
   - Click on the mentor you created
   - Select a time slot and book

5. **Accept Booking (as Mentor)**
   - Switch back to mentor account
   - Go to "View Bookings"
   - Accept the booking

6. **Join Video Session**
   - Both mentor and mentee can click "Join Session"
   - Test video call and chat features

---

## 📝 Important Notes

### MongoDB Setup
The app expects MongoDB to be running on `mongodb://localhost:27017/mentor_connect`

**If you don't have MongoDB installed:**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Or use MongoDB Atlas (cloud) - update connection string in `backend/server.js`

### Ports Used
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

---

## 🔧 Troubleshooting

**MongoDB not running?**
```powershell
# Windows - Start MongoDB service
net start MongoDB
```

**Port 5000 already in use?**
Edit `backend/server.js` and change:
```javascript
const PORT = process.env.PORT || 5001; // Change to 5001 or any available port
```

**Dependencies missing?**
```powershell
npm install
```

---

## 🎯 Features to Test

✅ User registration (Mentor & Mentee)
✅ Login/Logout
✅ Mentor: Set availability slots
✅ Mentor: View and manage bookings
✅ Mentee: Browse and search mentors
✅ Mentee: Book sessions
✅ Video calling with Jitsi
✅ In-session chat
✅ Responsive design

---

## 📚 For Full Documentation
See `SETUP_GUIDE.md` for complete details.

---

**Need Help?**
- Check console logs for errors
- Ensure both frontend and backend are running
- Verify MongoDB is connected
