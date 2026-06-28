import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import { apiJson } from '../../utils/api';

const MentorDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    completedSessions: 0,
    availableSlots: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [bookings, availability] = await Promise.all([
        apiJson(`/api/mentor/bookings/${user.id}`),
        apiJson(`/api/mentor/availability/${user.id}`)
      ]);

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        acceptedBookings: bookings.filter(b => b.status === 'accepted').length,
        completedSessions: bookings.filter(b => b.status === 'completed').length,
        availableSlots: availability.length
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your mentoring overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Pending Requests</p>
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

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-800">{stats.completedSessions}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Available Slots</p>
                <p className="text-3xl font-bold text-gray-800">{stats.availableSlots}</p>
              </div>
              <div className="bg-indigo-100 rounded-full p-3">
                <span className="text-2xl">🕐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/mentor/availability"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Set Availability</h3>
                <p className="text-sm text-indigo-100">Manage your time slots</p>
              </div>
            </div>
          </Link>

          <Link
            to="/mentor/bookings"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-3xl">📋</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">View Bookings</h3>
                <p className="text-sm text-green-100">Manage your sessions</p>
              </div>
            </div>
          </Link>

          <Link
            to="/mentor/profile"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <span className="text-3xl">👤</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Edit Profile</h3>
                <p className="text-sm text-orange-100">Update your information</p>
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
                to="/mentor/bookings"
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
                    Mentee
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
                      No bookings yet. Set your availability to start receiving requests!
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-600 mr-3">
                            {booking.menteeId?.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {booking.menteeId?.name || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-500">{booking.menteeId?.email}</p>
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
                          to="/mentor/bookings"
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
      </div>
    </div>
  );
};

export default MentorDashboard;
