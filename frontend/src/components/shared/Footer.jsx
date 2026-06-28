import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Mentor Connect</h3>
            <p className="text-gray-400 text-sm">
              Empowering career growth through expert mentorship. Connect with
              industry leaders and unlock your potential.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* For Mentors */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Mentors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition bg-transparent border-none p-0 cursor-default"
                >
                  Become a Mentor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition bg-transparent border-none p-0 cursor-default"
                >
                  Mentor Guidelines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition bg-transparent border-none p-0 cursor-default"
                >
                  Best Practices
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 support@mentorconnect.com</li>
              <li>📞 +91 1234567890</li>
              <li>📍 Punjab, India</li>
            </ul>

            <div className="flex space-x-3 mt-4">
              <button
                type="button"
                className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition"
              >
                <span className="text-xs">f</span>
              </button>

              <button
                type="button"
                className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition"
              >
                <span className="text-xs">𝕏</span>
              </button>

              <button
                type="button"
                className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition"
              >
                <span className="text-xs">in</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Mentor Connect. Built for Smart
            India Hackathon 2024 - Punjab Skill Development Mission (PSDM)
          </p>
          <p className="mt-2">
            Problem Statement ID: 1630 | Category: Smart Education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
