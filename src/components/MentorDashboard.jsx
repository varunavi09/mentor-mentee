import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiJson, apiFetch } from '../utils/api';

const MentorDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('availability');
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: '',
    timeSlot: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'mentor') {
      navigate('/login');
      return;
    }
    fetchAvailability();
    fetchBookings();
  }, [user, navigate]);

  const fetchAvailability = async () => {
    try {
      const data = await apiJson(`/api/mentor/availability/${user.id}`);
      setAvailability(data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await apiJson(`/api/mentor/bookings/${user.id}`);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await apiJson('/api/mentor/availability', {
        method: 'POST',
        body: {
          mentorId: user.id,
          ...newSlot
        }
      });

      setMessage('Time slot added successfully!');
      setNewSlot({ date: '', timeSlot: '' });
      fetchAvailability();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await apiFetch(`/api/mentor/availability/${slotId}`, { method: 'DELETE' });
      fetchAvailability();
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      const res = await apiFetch(`/api/mentor/bookings/${bookingId}`, {
        method: 'PATCH',
        body: { status }
      });

      if (res.ok) {
        fetchBookings();
        setMessage(`Booking ${status} successfully!`);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleJoinSession = (bookingId) => {
    navigate(`/video-call/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Mentor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('availability')}
            className={`pb-4 px-6 font-semibold ${
              activeTab === 'availability'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Set Availability
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 px-6 font-semibold ${
              activeTab === 'bookings'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            View Bookings
            {bookings.filter(b => b.status === 'pending').length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {bookings.filter(b => b.status === 'pending').length}
              </span>
            )}
          </button>
        </div>

        {message && (
          <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
            {message}
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add Availability Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Add Available Time Slot</h2>
              <form onSubmit={handleAddSlot} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newSlot.date}
                    onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slot
                  </label>
                  <select
                    required
                    value={newSlot.timeSlot}
                    onChange={(e) => setNewSlot({ ...newSlot, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select time slot</option>
                    <option value="09:00 - 10:00">09:00 - 10:00</option>
                    <option value="10:00 - 11:00">10:00 - 11:00</option>
                    <option value="11:00 - 12:00">11:00 - 12:00</option>
                    <option value="12:00 - 13:00">12:00 - 13:00</option>
                    <option value="13:00 - 14:00">13:00 - 14:00</option>
                    <option value="14:00 - 15:00">14:00 - 15:00</option>
                    <option value="15:00 - 16:00">15:00 - 16:00</option>
                    <option value="16:00 - 17:00">16:00 - 17:00</option>
                    <option value="17:00 - 18:00">17:00 - 18:00</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Time Slot'}
                </button>
              </form>
            </div>

            {/* Current Availability */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Your Available Slots</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availability.length === 0 ? (
                  <p className="text-gray-500">No availability set yet.</p>
                ) : (
                  availability.map((slot) => (
                    <div
                      key={slot._id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{slot.date}</p>
                        <p className="text-sm text-gray-600">{slot.timeSlot}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteSlot(slot._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-bold p-6 bg-gray-50 border-b">Your Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No bookings yet.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {booking.menteeId?.name}
                            </p>
                            <p className="text-sm text-gray-500">{booking.menteeId?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{booking.date}</p>
                            <p className="text-sm text-gray-500">{booking.timeSlot}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleBookingAction(booking._id, 'declined')}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                          {booking.status === 'accepted' && (
                            <button
                              onClick={() => handleJoinSession(booking._id)}
                              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                            >
                              Join Session
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
