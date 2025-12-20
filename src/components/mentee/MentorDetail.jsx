import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import { apiJson } from '../../utils/api';

const MentorDetail = ({ user }) => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(null); // holds slotId while booking
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchMentorDetails();
  }, [mentorId]);

  const fetchMentorDetails = async () => {
    try {
      const data = await apiJson(`/api/mentee/mentors/${mentorId}`);
      setMentor(data.mentor);
      setAvailability(data.availability);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mentor details:', error);
      setLoading(false);
    }
  };

  const handleBookSession = async (availabilityId, date, timeSlot) => {
    setMessage({ type: '', text: '' });
    setBookingLoading(availabilityId);
    try {
      await apiJson('/api/booking', {
        method: 'POST',
        body: {
          mentorId: mentor._id,
          menteeId: user.id,
          availabilityId,
          date,
          timeSlot,
          // Allow empty notes; provide fallback text if none entered
          notes: bookingNotes.trim() || 'General mentoring session'
        }
      });
      setMessage({ type: 'success', text: 'Booking request sent successfully!' });
      setTimeout(() => navigate('/mentee/bookings'), 1500);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setBookingLoading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading mentor details..." />;
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Mentor not found</h2>
          <button
            onClick={() => navigate('/mentee/mentors')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Back to Mentors
          </button>
        </div>
      </div>
    );
  }

  const groupedAvailability = availability.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/mentee/mentors')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
        >
          ← Back to all mentors
        </button>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mentor Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
                <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-4">
                  {mentor.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold mb-2">{mentor.name}</h2>
                <p className="text-indigo-100">{mentor.industry}</p>
                <p className="mt-2 text-sm">⭐ {mentor.yearsOfExperience}+ years experience</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">About</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {mentor.bio || 'No bio available'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
                  <p className="text-sm text-gray-600">📧 {mentor.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Session</h2>

              {/* Notes Section */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What would you like to discuss? (optional)
                </label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Share your goals, questions, or topics you'd like guidance on..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Adding context helps the mentor prepare, but you can leave this blank.
                </p>
              </div>

              {/* Available Slots */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Available Time Slots ({availability.length})
                </h3>

                {availability.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-5xl mb-3">📭</div>
                    <p className="text-gray-600">
                      No available slots at the moment. Please check back later.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.keys(groupedAvailability)
                      .sort()
                      .map((date) => (
                        <div key={date} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="mr-2">📅</span>
                            {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {groupedAvailability[date].map((slot) => (
                              <div
                                key={slot._id}
                                className="flex justify-between items-center p-4 border rounded-lg hover:border-indigo-500 transition bg-gray-50"
                              >
                                <div className="flex items-center">
                                  <span className="text-indigo-600 mr-3">🕐</span>
                                  <span className="font-medium text-gray-800">
                                    {slot.timeSlot}
                                  </span>
                                </div>
                                {(() => {
                                  // Determine slot status (upcoming, in-progress, past)
                                  const now = new Date();
                                  const todayStr = now.toISOString().split('T')[0];
                                  const slotDateObj = new Date(slot.date + 'T00:00:00');
                                  const [startStr, endStr] = slot.timeSlot.split('-').map(s => s.trim());
                                  const [startH, startM] = startStr.split(':').map(Number);
                                  const [endH, endM] = endStr.split(':').map(Number);
                                  const startTime = new Date(slotDateObj);
                                  startTime.setHours(startH, startM, 0, 0);
                                  const endTime = new Date(slotDateObj);
                                  endTime.setHours(endH, endM, 0, 0);

                                  let slotStatus = 'upcoming';
                                  if (slotDateObj.toISOString().split('T')[0] < todayStr) {
                                    slotStatus = 'past';
                                  } else if (slotDateObj.toISOString().split('T')[0] === todayStr) {
                                    if (now > endTime) {
                                      slotStatus = 'past';
                                    } else if (now >= startTime && now <= endTime) {
                                      slotStatus = 'in-progress';
                                    }
                                  }

                                  const isDisabled = slotStatus === 'past' || bookingLoading === slot._id;
                                  return (
                                    <div className="flex items-center space-x-3">
                                      <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                          slotStatus === 'in-progress'
                                            ? 'bg-green-100 text-green-700'
                                            : slotStatus === 'past'
                                            ? 'bg-gray-200 text-gray-600'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}
                                      >
                                        {slotStatus.replace('-', ' ')}
                                      </span>
                                      <button
                                        onClick={() => handleBookSession(slot._id, slot.date, slot.timeSlot)}
                                        disabled={isDisabled}
                                        className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-semibold ${
                                          isDisabled ? 'opacity-60 cursor-not-allowed' : ''
                                        }`}
                                        title={slotStatus === 'past' ? 'This time slot has expired' : 'Book this mentoring session'}
                                      >
                                        {bookingLoading === slot._id
                                          ? 'Booking...'
                                          : slotStatus === 'past'
                                          ? 'Expired'
                                          : 'Book'}
                                      </button>
                                    </div>
                                  );
                                })()}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
