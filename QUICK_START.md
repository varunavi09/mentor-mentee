# 🚀 Quick Start Guide - Mentor Connect

## ✅ Everything is Ready!

Your Mentor Connect platform is now fully set up with:
- ✅ Beautiful role selection landing page
- ✅ 5 mentors with full profiles
- ✅ 3 mentees ready to book sessions
- ✅ 139 availability slots
- ✅ 5 sample bookings with different statuses
- ✅ Complete authentication system

---

## 🎯 Start Testing NOW!

### Step 1: Open the Application
Your browser should already be showing: **http://localhost:3000**

You'll see a beautiful landing page with **2 cards**:
- 👨‍🏫 **"I am a Mentor"** card (Indigo/Purple gradient)
- 👨‍🎓 **"I am a Mentee"** card (Pink/Rose gradient)

---

## 👨‍🏫 Test as MENTOR

### Click "I am a Mentor" card

**Login Credentials (Pick any one):**

1. **Dr. Rajesh Kumar** - Full Stack Developer
   - Email: `rajesh.mentor@mentorconnect.com`
   - Password: `mentor123`
   - Expertise: Web Development, JavaScript, React, Node.js

2. **Priya Sharma** - Data Scientist
   - Email: `priya.mentor@mentorconnect.com`
   - Password: `mentor123`
   - Expertise: Data Science, Machine Learning, Python, AI

3. **Amit Patel** - Mobile Developer
   - Email: `amit.mentor@mentorconnect.com`
   - Password: `mentor123`
   - Expertise: Mobile Development, Flutter, Dart, iOS, Android

4. **Sneha Reddy** - UI/UX Designer
   - Email: `sneha.mentor@mentorconnect.com`
   - Password: `mentor123`
   - Expertise: UI/UX Design, Figma, Adobe XD

5. **Vikram Singh** - Cloud Architect
   - Email: `vikram.mentor@mentorconnect.com`
   - Password: `mentor123`
   - Expertise: Cloud Computing, AWS, DevOps, Docker

### What You Can Do:
1. ✅ **Dashboard** - See booking statistics and recent sessions
2. ✅ **Availability** - Already has 25-30 slots created! Add more if you want
3. ✅ **Bookings** - See pending requests (Accept/Decline them)
4. ✅ **Profile** - View and edit your mentor profile
5. ✅ **Join Video Sessions** - For accepted bookings

---

## 👨‍🎓 Test as MENTEE

### Click "I am a Mentee" card

**Login Credentials (Pick any one):**

1. **Rahul Verma** - CS Student
   - Email: `rahul.mentee@mentorconnect.com`
   - Password: `mentee123`
   - Has 2 bookings already!

2. **Ananya Gupta** - Aspiring Data Scientist
   - Email: `ananya.mentee@mentorconnect.com`
   - Password: `mentee123`
   - Has 2 bookings already!

3. **Karthik Krishnan** - Junior Developer
   - Email: `karthik.mentee@mentorconnect.com`
   - Password: `mentee123`
   - Has 1 booking already!

### What You Can Do:
1. ✅ **Dashboard** - See your booking statistics
2. ✅ **Find Mentors** - Browse all 5 mentors
3. ✅ **Search & Filter** - Search by name or filter by expertise
4. ✅ **View Mentor Details** - Click any mentor card
5. ✅ **Book Sessions** - Choose from 25-30 available slots per mentor
6. ✅ **My Bookings** - Track all your bookings
7. ✅ **Join Video Sessions** - For accepted bookings
8. ✅ **Profile** - View and edit your profile

---

## 🎬 Complete User Flow Example

### Scenario: Book a Session with Dr. Rajesh

1. **Visit** http://localhost:3000
2. **Click** "I am a Mentee" card
3. **Login** with:
   - Email: `rahul.mentee@mentorconnect.com`
   - Password: `mentee123`
4. **Click** "Find Mentors" from navbar or dashboard
5. **Search** for "Rajesh" or filter by "Web Development"
6. **Click** "View Profile" on Dr. Rajesh Kumar's card
7. **See** his expertise, bio, and 25+ available time slots
8. **Add** session notes: "Need help with React Hooks"
9. **Click** "Book Session" on any available slot
10. **Go to** "My Bookings" to see your request (Status: Pending)

### Now Switch to Mentor:

11. **Logout** (click user icon in navbar)
12. **Go back** to home page
13. **Click** "I am a Mentor" card
14. **Login** with:
    - Email: `rajesh.mentor@mentorconnect.com`
    - Password: `mentor123`
15. **Go to** "Bookings" section
16. **See** the new booking request from Rahul
17. **Click** "Accept" button
18. **Both** can now click "Join Session" to start video call!

---

## 🎥 Video Call Feature

When a booking is **Accepted**:
- Both mentor and mentee see a **"Join Session"** button
- Click it to enter a **Jitsi Meet video conference**
- Room is named: `mentor-connect-booking-{bookingId}`

---

## 📊 Sample Data Included

### 5 Pre-created Bookings:

1. **Rahul → Dr. Rajesh** (Pending)
   - Topic: React best practices

2. **Ananya → Priya** (Accepted) ✅
   - Topic: Machine learning fundamentals
   - Can join video call!

3. **Karthik → Amit** (Accepted) ✅
   - Topic: Flutter development
   - Can join video call!

4. **Rahul → Sneha** (Completed)
   - Topic: UI/UX principles
   - Already finished!

5. **Ananya → Vikram** (Pending)
   - Topic: Cloud technologies

---

## 🎨 Features to Explore

### Mentor Features:
- 📊 **Statistics Dashboard** - Total bookings, pending, accepted, completed
- 📅 **Availability Management** - Add/remove time slots
- 📝 **Booking Management** - Filter by status (All, Pending, Accepted, Completed)
- ✅ **Accept/Decline Requests** - One-click actions
- 🎥 **Video Sessions** - Join button for accepted bookings
- 👤 **Profile Management** - Edit mode with stats

### Mentee Features:
- 📊 **Statistics Dashboard** - Total mentors, bookings, sessions
- 🔍 **Search Mentors** - Real-time search by name
- 🎯 **Filter by Expertise** - Dropdown with all skills
- 👀 **View Mentor Details** - Full profile with availability
- 📝 **Add Session Notes** - Describe what you want to learn
- 📅 **Book Sessions** - Choose from available slots
- 📋 **Track Bookings** - Filter by status
- ❌ **Cancel Bookings** - For pending requests
- 🎥 **Join Sessions** - For accepted bookings

---

## 🔄 Reset Database (If Needed)

To start fresh with sample data:
```bash
cd backend
node seedDatabase.js
```

This will:
- Clear all existing data
- Create 5 mentors again
- Create 3 mentees again
- Add 139 availability slots
- Create 5 sample bookings

---

## 📞 Test Different Scenarios

### Scenario 1: Mentor Workflow
1. Login as any mentor
2. Check dashboard stats
3. View pending bookings
4. Accept a booking
5. Join video session

### Scenario 2: Mentee Workflow
1. Login as any mentee
2. Browse mentors
3. Filter by expertise
4. View mentor details
5. Book a new session
6. Track in "My Bookings"

### Scenario 3: Video Call
1. Find an accepted booking
2. Both mentor and mentee click "Join Session"
3. Test video/audio in Jitsi Meet

### Scenario 4: Search & Filter
1. Login as mentee
2. Go to "Find Mentors"
3. Search "Priya" or "Data"
4. Filter by "Machine Learning"
5. Results update instantly

---

## 🎯 All Credentials at a Glance

### Mentors (All use password: `mentor123`)
- rajesh.mentor@mentorconnect.com
- priya.mentor@mentorconnect.com
- amit.mentor@mentorconnect.com
- sneha.mentor@mentorconnect.com
- vikram.mentor@mentorconnect.com

### Mentees (All use password: `mentee123`)
- rahul.mentee@mentorconnect.com
- ananya.mentee@mentorconnect.com
- karthik.mentee@mentorconnect.com

---

## 🏆 You're All Set!

Your **Smart India Hackathon 2024** project is **production-ready**!

### What Makes This Special:
✅ Beautiful role selection page with animated cards
✅ Real data with realistic profiles
✅ Complete booking workflow
✅ Video conferencing integration
✅ Responsive design for all devices
✅ Professional UI with Tailwind CSS
✅ Role-based authentication and authorization
✅ 139+ available time slots across 7 days
✅ Multiple booking statuses (pending, accepted, completed)
✅ Search and filter functionality

---

## 🚀 Start Exploring!

**Go to:** http://localhost:3000

**Choose your role and start testing!** 🎉

---

*For full credentials list, see* **CREDENTIALS.md**
*For project structure, see* **NEW_STRUCTURE_GUIDE.md**
