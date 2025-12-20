import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiJson, apiFetch } from '../utils/api';

const MenteeDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('findMentor');
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorAvailability, setMentorAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingNotes, setBookingNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'mentee') {
      navigate('/login');
      return;
    }
    fetchMentors();
    fetchMyBookings();
  }, [user, navigate]);

  const fetchMentors = async () => {
    try {
      const data = await apiJson('/api/mentee/mentors');
      setMentors(data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const data = await apiJson(`/api/mentee/bookings/${user.id}`);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchMentorDetails = async (mentorId) => {
    try {
      const data = await apiJson(`/api/mentee/mentors/${mentorId}`);
      setSelectedMentor(data.mentor);
      setMentorAvailability(data.availability);
    } catch (error) {
      console.error('Error fetching mentor details:', error);
    }
  };

  const handleBookSession = async (availabilityId, date, timeSlot) => {
    setLoading(true);
    setMessage('');

    try {
      const data = await apiJson('/api/booking', {
        method: 'POST',
        body: {
          mentorId: selectedMentor._id,
          menteeId: user.id,
          availabilityId,
          date,
          timeSlot,
          notes: bookingNotes
        }
      });

      setMessage('Booking request sent successfully!');
      setBookingNotes('');
      fetchMentorDetails(selectedMentor._id);
      fetchMyBookings();
      
      // Switch to bookings tab after successful booking
      setTimeout(() => {
        setActiveTab('myBookings');
      }, 1500);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await apiFetch(`/api/booking/${bookingId}`, { method: 'DELETE' });
      fetchMyBookings();
      setMessage('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleJoinSession = (bookingId) => {
    navigate(`/video-call/${bookingId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
    mentor.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Mentee Dashboard</h1>
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
            onClick={() => {
              setActiveTab('findMentor');
              setSelectedMentor(null);
            }}
            className={`pb-4 px-6 font-semibold ${
              activeTab === 'findMentor'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Find Mentor
          </button>
          <button
            onClick={() => setActiveTab('myBookings')}
            className={`pb-4 px-6 font-semibold ${
              activeTab === 'myBookings'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            My Bookings
            {bookings.filter(b => b.status === 'accepted').length > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {bookings.filter(b => b.status === 'accepted').length}
              </span>
            )}
          </button>
        </div>

        {message && (
          <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
            {message}
          </div>
        )}

        {/* Find Mentor Tab */}
        {activeTab === 'findMentor' && !selectedMentor && (
          <div>
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by name, expertise, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Mentors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-8">
                  No mentors found. Try a different search term.
                </p>
              ) : (
                filteredMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => fetchMentorDetails(mentor._id)}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">
                        {mentor.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-800">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.industry}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {mentor.bio || 'No bio available'}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-gray-500 font-semibold mb-1">EXPERTISE:</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 3).map((exp, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded"
                          >
                            {exp}
                          </span>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{mentor.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>⏱️ {mentor.yearsOfExperience} years exp.</span>
                      <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Mentor Details & Booking */}
        {activeTab === 'findMentor' && selectedMentor && (
          <div>
            <button
              onClick={() => setSelectedMentor(null)}
              className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              ← Back to mentors
            </button>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Mentor Info */}
              <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600 mx-auto mb-3">
                    {selectedMentor.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedMentor.name}</h2>
                  <p className="text-gray-600">{selectedMentor.industry}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedMentor.yearsOfExperience} years of experience
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                  <p className="text-sm text-gray-600">
                    {selectedMentor.bio || 'No bio available'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Slots */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Book a Session</h2>

                {mentorAvailability.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No available slots at the moment. Please check back later.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="Tell the mentor what you'd like to discuss..."
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                      {mentorAvailability.map((slot) => (
                        <div
                          key={slot._id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-800">{slot.date}</p>
                              <p className="text-sm text-gray-600">{slot.timeSlot}</p>
                            </div>
                            <button
                              onClick={() => handleBookSession(slot._id, slot.date, slot.timeSlot)}
                              disabled={loading}
                              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 text-sm"
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'myBookings' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-bold p-6 bg-gray-50 border-b">My Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No bookings yet. Find a mentor to book your first session!
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {booking.mentorId?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.mentorId?.expertise?.join(', ')}
                            </p>
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
                          {booking.status === 'accepted' && (
                            <button
                              onClick={() => handleJoinSession(booking._id)}
                              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 mr-2"
                            >
                              Join Session
                            </button>
                          )}
                          {(booking.status === 'pending' || booking.status === 'accepted') && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            >
                              Cancel
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

export default MenteeDashboard;
