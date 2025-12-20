import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Don't show navbar on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
              MC
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mentor Connect
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/"
                  className={`${
                    isActive('/') ? 'text-indigo-600 font-semibold' : 'text-gray-700'
                  } hover:text-indigo-600 transition`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                {user.role === 'mentor' ? (
                  <>
                    <Link
                      to="/mentor/dashboard"
                      className={`${
                        isActive('/mentor/dashboard')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/mentor/availability"
                      className={`${
                        isActive('/mentor/availability')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Availability
                    </Link>
                    <Link
                      to="/mentor/bookings"
                      className={`${
                        isActive('/mentor/bookings')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Bookings
                    </Link>
                    <Link
                      to="/mentor/profile"
                      className={`${
                        isActive('/mentor/profile')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/mentee/dashboard"
                      className={`${
                        isActive('/mentee/dashboard')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/mentee/mentors"
                      className={`${
                        isActive('/mentee/mentors')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Find Mentors
                    </Link>
                    <Link
                      to="/mentee/bookings"
                      className={`${
                        isActive('/mentee/bookings')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/mentee/profile"
                      className={`${
                        isActive('/mentee/profile')
                          ? 'text-indigo-600 font-semibold'
                          : 'text-gray-700'
                      } hover:text-indigo-600 transition`}
                    >
                      Profile
                    </Link>
                  </>
                )}

                {/* User Menu */}
                <div className="flex items-center space-x-3 border-l pl-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
