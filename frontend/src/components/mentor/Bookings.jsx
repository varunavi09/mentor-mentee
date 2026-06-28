import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import { apiJson, apiFetch } from '../../utils/api';

const MentorBookings = ({ user }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

 

  const fetchBookings = useCallback(async () => {
  try {
    const data = await apiJson(`/api/mentor/bookings/${user.id}`);
    setBookings(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    setLoading(false);
  }
}, [user.id]);

  const filterBookings = useCallback(() => {
  if (filter === 'all') {
    setFilteredBookings(bookings);
  } else {
    setFilteredBookings(bookings.filter(b => b.status === filter));
  }
}, [filter, bookings]);
 useEffect(() => {
  fetchBookings();
}, [fetchBookings]);

  useEffect(() => {
  filterBookings();
}, [filterBookings]);

  const handleBookingAction = async (bookingId, status) => {
    try {
      const res = await apiFetch(`/api/mentor/bookings/${bookingId}`, {
        method: 'PATCH',
        body: { status }
      });

      if (res.ok) {
        setMessage({ type: 'success', text: `Booking ${status} successfully!` });
        fetchBookings();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update booking' });
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      setMessage({ type: 'error', text: 'Failed to update booking' });
    }
  };

  const handleJoinSession = (bookingId) => {
    navigate(`/video-call/${bookingId}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading bookings..." />;
  }

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    accepted: bookings.filter(b => b.status === 'accepted').length,
    declined: bookings.filter(b => b.status === 'declined').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your mentoring session requests</p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="flex flex-wrap">
            {[
              { key: 'all', label: 'All Bookings', icon: '📋' },
              { key: 'pending', label: 'Pending', icon: '⏳' },
              { key: 'accepted', label: 'Accepted', icon: '✅' },
              { key: 'completed', label: 'Completed', icon: '🎯' },
              { key: 'declined', label: 'Declined', icon: '❌' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  filter === tab.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                <span className="ml-2 text-sm">({statusCounts[tab.key]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No {filter !== 'all' ? filter : ''} bookings found
              </h3>
              <p className="text-gray-500">
                {filter === 'pending'
                  ? 'No pending requests at the moment'
                  : filter === 'accepted'
                  ? 'No accepted sessions yet'
                  : 'Start by setting your availability to receive booking requests'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Mentee Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Session Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Notes
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
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
                        <p className="font-semibold text-gray-800 mb-1">
                          📅 {new Date(booking.date + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600">🕐 {booking.timeSlot}</p>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {booking.notes || 'No notes provided'}
                        </p>
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
                        {booking.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleBookingAction(booking._id, 'accepted')}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition font-semibold"
                            >
                              ✓ Accept
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking._id, 'declined')}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition font-semibold"
                            >
                              ✗ Decline
                            </button>
                          </div>
                        )}
                        {booking.status === 'accepted' && (
                          <button
                            onClick={() => handleJoinSession(booking._id)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition font-semibold"
                          >
                            🎥 Join Session
                          </button>
                        )}
                        {booking.status === 'declined' && (
                          <span className="text-gray-400 text-sm">No actions available</span>
                        )}
                        {booking.status === 'completed' && (
                          <span className="text-green-600 text-sm font-semibold">✓ Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorBookings;
