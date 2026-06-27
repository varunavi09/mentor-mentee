import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import { apiJson } from '../../utils/api';

const MenteeDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    completedSessions: 0,
    availableMentors: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user.id]);

  const fetchDashboardData = async () => {
    try {
      const [bookings, mentors] = await Promise.all([
        apiJson(`/api/mentee/bookings/${user.id}`),
        apiJson('/api/mentee/mentors')
      ]);

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        acceptedBookings: bookings.filter(b => b.status === 'accepted').length,
        completedSessions: bookings.filter(b => b.status === 'completed').length,
        availableMentors: mentors.length
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Ready to connect with amazing mentors?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">My Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingBookings}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Accepted</p>
                <p className="text-3xl font-bold text-gray-800">{stats.acceptedBookings}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-800">{stats.completedSessions}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Available Mentors</p>
                <p className="text-3xl font-bold text-gray-800">{stats.availableMentors}</p>
              </div>
              <div className="bg-indigo-100 rounded-full p-3">
                <span className="text-2xl">👨‍🏫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/mentee/mentors"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-3xl">🔍</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Find Mentors</h3>
                <p className="text-sm text-purple-100">Browse expert mentors</p>
              </div>
            </div>
          </Link>

          <Link
            to="/mentee/bookings"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">My Bookings</h3>
                <p className="text-sm text-blue-100">Manage your sessions</p>
              </div>
            </div>
          </Link>

          <Link
            to="/mentee/profile"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-3xl">👤</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">My Profile</h3>
                <p className="text-sm text-green-100">Update your details</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
              <Link
                to="/mentee/bookings"
                className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
              >
                View All →
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mentor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      <div className="text-5xl mb-3">📭</div>
                      <p>No bookings yet. Start by finding a mentor!</p>
                      <Link
                        to="/mentee/mentors"
                        className="inline-block mt-3 text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Browse Mentors →
                      </Link>
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold text-white mr-3">
                            {booking.mentorId?.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {booking.mentorId?.name || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.mentorId?.expertise?.slice(0, 2).join(', ')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{booking.date}</p>
                        <p className="text-sm text-gray-500">{booking.timeSlot}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to="/mentee/bookings"
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Tips for Getting the Most from Mentorship
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Come prepared with specific questions and goals for each session</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Be open to feedback and willing to implement suggestions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Follow up after sessions and share your progress</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Respect your mentor's time and be punctual for sessions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
