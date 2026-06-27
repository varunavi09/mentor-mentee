import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Mentor Connect
          </h1>
          <p className="text-2xl mb-4">
            Empowering Career Growth Through Expert Mentorship
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Connect with industry leaders and subject matter experts who can guide you
            through your career journey. Book sessions, get personalized advice, and
            unlock your full potential.
          </p>

          <div className="flex justify-center space-x-6 mb-16">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105"
            >
              Learn More
            </a>
          </div>

          <div id="features" className="grid md:grid-cols-3 gap-8 mt-20 text-left">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 hover:bg-opacity-20 transition">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-3">Easy Scheduling</h3>
              <p className="text-gray-100">
                Book sessions with mentors based on their availability. Simple and automated calendar system.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 hover:bg-opacity-20 transition">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-2xl font-bold mb-3">Video Meetings</h3>
              <p className="text-gray-100">
                Integrated video call feature for seamless virtual mentorship sessions with chat support.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 hover:bg-opacity-20 transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Expert Guidance</h3>
              <p className="text-gray-100">
                Connect with senior leaders and subject matter experts from various industries.
              </p>
            </div>
          </div>

          <div className="mt-20 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">👩‍🎓 For Mentees</h4>
                <ol className="space-y-2 text-gray-100">
                  <li>1. Sign up and create your profile</li>
                  <li>2. Browse available mentors by expertise</li>
                  <li>3. Book a session at a convenient time</li>
                  <li>4. Join the video call and learn</li>
                </ol>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">👨‍💼 For Mentors</h4>
                <ol className="space-y-2 text-gray-100">
                  <li>1. Register as a mentor with your expertise</li>
                  <li>2. Set your available time slots</li>
                  <li>3. Review and accept booking requests</li>
                  <li>4. Share your knowledge and help others grow</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
