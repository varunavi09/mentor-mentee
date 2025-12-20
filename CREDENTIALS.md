# 🔐 Mentor Connect - Login Credentials

## 📋 Test Accounts

All passwords are set to simple values for testing purposes. In production, use strong passwords!

---

## 👨‍🏫 MENTOR ACCOUNTS

### 1. Dr. Rajesh Kumar - Full Stack Developer
- **Email:** `rajesh.mentor@mentorconnect.com`
- **Password:** `mentor123`
- **Expertise:** Web Development, JavaScript, React, Node.js
- **Experience:** 10 years
- **Industry:** Software Development
- **Bio:** Full-stack developer with 10+ years of experience in building scalable web applications. Passionate about teaching and mentoring aspiring developers.

---

### 2. Priya Sharma - Data Scientist
- **Email:** `priya.mentor@mentorconnect.com`
- **Password:** `mentor123`
- **Expertise:** Data Science, Machine Learning, Python, AI
- **Experience:** 8 years
- **Industry:** Data Science & Analytics
- **Bio:** Data scientist specializing in ML and AI solutions. Love helping students understand complex algorithms and their real-world applications.

---

### 3. Amit Patel - Mobile Developer
- **Email:** `amit.mentor@mentorconnect.com`
- **Password:** `mentor123`
- **Expertise:** Mobile Development, Flutter, Dart, iOS, Android
- **Experience:** 12 years
- **Industry:** Mobile App Development
- **Bio:** Mobile app developer with expertise in cross-platform development. Built 50+ apps with millions of downloads.

---

### 4. Sneha Reddy - UI/UX Designer
- **Email:** `sneha.mentor@mentorconnect.com`
- **Password:** `mentor123`
- **Expertise:** UI/UX Design, Figma, Adobe XD, Product Design
- **Experience:** 7 years
- **Industry:** Design & User Experience
- **Bio:** Product designer passionate about creating intuitive user experiences. Mentored 100+ designers in their journey.

---

### 5. Vikram Singh - Cloud Architect
- **Email:** `vikram.mentor@mentorconnect.com`
- **Password:** `mentor123`
- **Expertise:** Cloud Computing, AWS, DevOps, Docker, Kubernetes
- **Experience:** 9 years
- **Industry:** Cloud & Infrastructure
- **Bio:** Cloud architect and DevOps expert. Help organizations migrate to cloud and optimize their infrastructure.

---

## 👨‍🎓 MENTEE ACCOUNTS

### 1. Rahul Verma - CS Student
- **Email:** `rahul.mentee@mentorconnect.com`
- **Password:** `mentee123`
- **Bio:** Computer science student eager to learn web development and build real-world projects.
- **Experience:** 0 years
- **Industry:** Student

---

### 2. Ananya Gupta - Aspiring Data Scientist
- **Email:** `ananya.mentee@mentorconnect.com`
- **Password:** `mentee123`
- **Bio:** Aspiring data scientist looking to break into the ML/AI field. Currently learning Python and statistics.
- **Experience:** 1 year
- **Industry:** Student

---

### 3. Karthik Krishnan - Junior Developer
- **Email:** `karthik.mentee@mentorconnect.com`
- **Password:** `mentee123`
- **Bio:** Junior developer wanting to specialize in mobile app development. Interested in Flutter.
- **Experience:** 1 year
- **Industry:** Junior Developer

---

## 📊 Pre-Created Bookings

The database is seeded with sample bookings:

1. **Rahul → Dr. Rajesh Kumar** (Status: Pending)
   - Topic: React best practices and state management

2. **Ananya → Priya Sharma** (Status: Accepted)
   - Topic: Machine learning fundamentals and career path

3. **Karthik → Amit Patel** (Status: Accepted)
   - Topic: Flutter development and app architecture

4. **Rahul → Sneha Reddy** (Status: Completed)
   - Topic: UI/UX principles for projects

5. **Ananya → Vikram Singh** (Status: Pending)
   - Topic: Cloud technologies and DevOps practices

---

## 🚀 Quick Start

### Step 1: Seed the Database
```bash
cd backend
node seedDatabase.js
```

### Step 2: Start Backend Server
```bash
cd backend
node server.js
```

### Step 3: Start Frontend
```bash
npm start
```

### Step 4: Access the Application
1. Open browser: `http://localhost:3000`
2. Choose role (Mentor or Mentee)
3. Login with any credentials above

---

## 🎯 Testing Workflows

### As a Mentor (Use any mentor account):
1. Login as mentor
2. View dashboard with booking statistics
3. Go to "Availability" and add new time slots
4. Check "Bookings" to see pending requests
5. Accept/Decline booking requests
6. Join video sessions for accepted bookings
7. Update profile information

### As a Mentee (Use any mentee account):
1. Login as mentee
2. View dashboard with your bookings
3. Click "Find Mentors" to browse all mentors
4. Search and filter mentors by expertise
5. Click on a mentor to view details
6. Book a session with notes
7. Go to "My Bookings" to track status
8. Join video sessions when accepted
9. Update profile information

---

## 📅 Availability Data

Each mentor has:
- **40-50 time slots** spread across the next 7 days
- Time slots range from **09:00 to 19:00**
- Slots are in 1-hour intervals
- Some slots are already booked (5 bookings total)

---

## 🎨 Role Selection Page

When you first visit `http://localhost:3000`, you'll see:
- Beautiful landing page with 2 cards
- **Mentor Card:** For experienced professionals
- **Mentee Card:** For learners and students
- Click any card to navigate to login with pre-selected role

---

## 🔒 Security Notes

⚠️ **Important:** These are test credentials for development only!

For production deployment:
- Use strong, unique passwords
- Implement proper password policies
- Add password reset functionality
- Enable two-factor authentication
- Use environment variables for sensitive data
- Implement rate limiting
- Add CAPTCHA for login attempts

---

## 📞 Support

If you encounter any issues:
1. Make sure MongoDB is running on `localhost:27017`
2. Check that backend server is running on port `5000`
3. Verify frontend is running on port `3000`
4. Check browser console for errors
5. Look at server logs for API errors

---

## 🎉 Features Available

✅ Role-based authentication
✅ Separate dashboards for mentors and mentees
✅ Availability management for mentors
✅ Booking system with status workflow
✅ Search and filter mentors
✅ Video conferencing with Jitsi
✅ Profile management
✅ Responsive design
✅ Real-time booking updates

---

**Happy Testing! 🚀**

*Smart India Hackathon 2024 | Problem Statement #1630*
*Punjab Skill Development Mission*
