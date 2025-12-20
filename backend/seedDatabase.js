const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('./models/User');
const Availability = require('./models/Availability');
const Booking = require('./models/Booking');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/mentor-connect';

// Sample data
const mentors = [
  {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.mentor@mentorconnect.com',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    bio: 'Full-stack developer with 10+ years of experience in building scalable web applications. Passionate about teaching and mentoring aspiring developers.',
    yearsOfExperience: 10,
    industry: 'Software Development'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.mentor@mentorconnect.com',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['Data Science', 'Machine Learning', 'Python', 'AI'],
    bio: 'Data scientist specializing in ML and AI solutions. Love helping students understand complex algorithms and their real-world applications.',
    yearsOfExperience: 8,
    industry: 'Data Science & Analytics'
  },
  {
    name: 'Amit Patel',
    email: 'amit.mentor@mentorconnect.com',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['Mobile Development', 'Flutter', 'Dart', 'iOS', 'Android'],
    bio: 'Mobile app developer with expertise in cross-platform development. Built 50+ apps with millions of downloads.',
    yearsOfExperience: 12,
    industry: 'Mobile App Development'
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.mentor@mentorconnect.com',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['UI/UX Design', 'Figma', 'Adobe XD', 'Product Design'],
    bio: 'Product designer passionate about creating intuitive user experiences. Mentored 100+ designers in their journey.',
    yearsOfExperience: 7,
    industry: 'Design & User Experience'
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.mentor@mentorconnect.com',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['Cloud Computing', 'AWS', 'DevOps', 'Docker', 'Kubernetes'],
    bio: 'Cloud architect and DevOps expert. Help organizations migrate to cloud and optimize their infrastructure.',
    yearsOfExperience: 9,
    industry: 'Cloud & Infrastructure'
  }
];

const mentees = [
  {
    name: 'Rahul Verma',
    email: 'rahul.mentee@mentorconnect.com',
    password: 'mentee123',
    role: 'mentee',
    expertise: [],
    bio: 'Computer science student eager to learn web development and build real-world projects.',
    yearsOfExperience: 0,
    industry: 'Student'
  },
  {
    name: 'Ananya Gupta',
    email: 'ananya.mentee@mentorconnect.com',
    password: 'mentee123',
    role: 'mentee',
    expertise: [],
    bio: 'Aspiring data scientist looking to break into the ML/AI field. Currently learning Python and statistics.',
    yearsOfExperience: 1,
    industry: 'Student'
  },
  {
    name: 'Karthik Krishnan',
    email: 'karthik.mentee@mentorconnect.com',
    password: 'mentee123',
    role: 'mentee',
    expertise: [],
    bio: 'Junior developer wanting to specialize in mobile app development. Interested in Flutter.',
    yearsOfExperience: 1,
    industry: 'Junior Developer'
  }
];

// Helper function to get dates
const getDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

// Seed function
async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Availability.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create mentors
    console.log('\n👨‍🏫 Creating mentors...');
    const createdMentors = [];
    for (const mentorData of mentors) {
      const hashedPassword = await bcrypt.hash(mentorData.password, 10);
      const mentor = await User.create({
        ...mentorData,
        password: hashedPassword
      });
      createdMentors.push(mentor);
      console.log(`   ✓ Created mentor: ${mentor.name} (${mentor.email})`);
    }

    // Create mentees
    console.log('\n👨‍🎓 Creating mentees...');
    const createdMentees = [];
    for (const menteeData of mentees) {
      const hashedPassword = await bcrypt.hash(menteeData.password, 10);
      const mentee = await User.create({
        ...menteeData,
        password: hashedPassword
      });
      createdMentees.push(mentee);
      console.log(`   ✓ Created mentee: ${mentee.name} (${mentee.email})`);
    }

    // Create availability for each mentor
    console.log('\n📅 Creating availability slots...');
    const availabilitySlots = [];
    const timeSlots = [
      '09:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00'
    ];

    for (const mentor of createdMentors) {
      // Create slots for next 7 days
      for (let day = 1; day <= 7; day++) {
        const date = getDate(day);
        // Each mentor has 3-5 random slots per day
        const numSlots = Math.floor(Math.random() * 3) + 3;
        const selectedSlots = timeSlots.sort(() => 0.5 - Math.random()).slice(0, numSlots);
        
        for (const timeSlot of selectedSlots) {
          const availability = await Availability.create({
            mentorId: mentor._id,
            date: date,
            timeSlot: timeSlot,
            isBooked: false
          });
          availabilitySlots.push(availability);
        }
      }
      console.log(`   ✓ Created slots for ${mentor.name}`);
    }

    // Create some bookings
    console.log('\n📝 Creating sample bookings...');
    
    // Booking 1: Rahul with Rajesh (Pending)
    const rajeshSlot = availabilitySlots.find(slot => 
      slot.mentorId.toString() === createdMentors[0]._id.toString() && !slot.isBooked
    );
    if (rajeshSlot) {
      await Booking.create({
        mentorId: createdMentors[0]._id,
        menteeId: createdMentees[0]._id,
        availabilityId: rajeshSlot._id,
        date: rajeshSlot.date,
        timeSlot: rajeshSlot.timeSlot,
        status: 'pending',
        notes: 'I want to learn React best practices and state management'
      });
      rajeshSlot.isBooked = true;
      await rajeshSlot.save();
      console.log('   ✓ Created booking: Rahul → Rajesh (Pending)');
    }

    // Booking 2: Ananya with Priya (Accepted)
    const priyaSlot = availabilitySlots.find(slot => 
      slot.mentorId.toString() === createdMentors[1]._id.toString() && !slot.isBooked
    );
    if (priyaSlot) {
      await Booking.create({
        mentorId: createdMentors[1]._id,
        menteeId: createdMentees[1]._id,
        availabilityId: priyaSlot._id,
        date: priyaSlot.date,
        timeSlot: priyaSlot.timeSlot,
        status: 'accepted',
        notes: 'Need guidance on machine learning fundamentals and career path'
      });
      priyaSlot.isBooked = true;
      await priyaSlot.save();
      console.log('   ✓ Created booking: Ananya → Priya (Accepted)');
    }

    // Booking 3: Karthik with Amit (Accepted)
    const amitSlot = availabilitySlots.find(slot => 
      slot.mentorId.toString() === createdMentors[2]._id.toString() && !slot.isBooked
    );
    if (amitSlot) {
      await Booking.create({
        mentorId: createdMentors[2]._id,
        menteeId: createdMentees[2]._id,
        availabilityId: amitSlot._id,
        date: amitSlot.date,
        timeSlot: amitSlot.timeSlot,
        status: 'accepted',
        notes: 'Want to discuss Flutter development and app architecture'
      });
      amitSlot.isBooked = true;
      await amitSlot.save();
      console.log('   ✓ Created booking: Karthik → Amit (Accepted)');
    }

    // Booking 4: Rahul with Sneha (Completed)
    const snehaSlot = availabilitySlots.find(slot => 
      slot.mentorId.toString() === createdMentors[3]._id.toString() && !slot.isBooked
    );
    if (snehaSlot) {
      await Booking.create({
        mentorId: createdMentors[3]._id,
        menteeId: createdMentees[0]._id,
        availabilityId: snehaSlot._id,
        date: snehaSlot.date,
        timeSlot: snehaSlot.timeSlot,
        status: 'completed',
        notes: 'Learn about UI/UX principles for my project'
      });
      snehaSlot.isBooked = true;
      await snehaSlot.save();
      console.log('   ✓ Created booking: Rahul → Sneha (Completed)');
    }

    // Booking 5: Ananya with Vikram (Pending)
    const vikramSlot = availabilitySlots.find(slot => 
      slot.mentorId.toString() === createdMentors[4]._id.toString() && !slot.isBooked
    );
    if (vikramSlot) {
      await Booking.create({
        mentorId: createdMentors[4]._id,
        menteeId: createdMentees[1]._id,
        availabilityId: vikramSlot._id,
        date: vikramSlot.date,
        timeSlot: vikramSlot.timeSlot,
        status: 'pending',
        notes: 'Interested in learning cloud technologies and DevOps practices'
      });
      vikramSlot.isBooked = true;
      await vikramSlot.save();
      console.log('   ✓ Created booking: Ananya → Vikram (Pending)');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   • Mentors: ${createdMentors.length}`);
    console.log(`   • Mentees: ${createdMentees.length}`);
    console.log(`   • Availability Slots: ${availabilitySlots.length}`);
    console.log(`   • Bookings: 5`);
    
    console.log(`\n👨‍🏫 Mentor Credentials:`);
    mentors.forEach(m => {
      console.log(`   • Email: ${m.email}`);
      console.log(`     Password: ${m.password}`);
    });
    
    console.log(`\n👨‍🎓 Mentee Credentials:`);
    mentees.forEach(m => {
      console.log(`   • Email: ${m.email}`);
      console.log(`     Password: ${m.password}`);
    });
    
    console.log('\n' + '='.repeat(60));

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
