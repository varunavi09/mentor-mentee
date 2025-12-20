import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { apiJson, apiFetch } from '../../utils/api';

const MentorAvailability = ({ user }) => {
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: '',
    timeSlot: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchAvailability();
  }, [user.id]);

  const fetchAvailability = async () => {
    try {
      const data = await apiJson(`/api/mentor/availability/${user.id}`);
      setAvailability(data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await apiJson('/api/mentor/availability', {
        method: 'POST',
        body: {
          mentorId: user.id,
          ...newSlot
        }
      });

      setMessage({ type: 'success', text: 'Time slot added successfully!' });
      setNewSlot({ date: '', timeSlot: '' });
      fetchAvailability();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm('Are you sure you want to remove this time slot?')) return;

    try {
      await apiFetch(`/api/mentor/availability/${slotId}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Time slot removed successfully!' });
      fetchAvailability();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error deleting slot:', error);
      setMessage({ type: 'error', text: 'Failed to remove time slot' });
    }
  };

  const groupedAvailability = availability.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Availability</h1>
          <p className="text-gray-600">Set your available time slots for mentoring sessions</p>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Availability Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                +
              </span>
              Add New Time Slot
            </h2>
            <form onSubmit={handleAddSlot} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time Slot
                </label>
                <select
                  required
                  value={newSlot.timeSlot}
                  onChange={(e) => setNewSlot({ ...newSlot, timeSlot: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Choose a time slot</option>
                  <option value="09:00 - 10:00">09:00 - 10:00 AM</option>
                  <option value="10:00 - 11:00">10:00 - 11:00 AM</option>
                  <option value="11:00 - 12:00">11:00 - 12:00 PM</option>
                  <option value="12:00 - 13:00">12:00 - 01:00 PM</option>
                  <option value="13:00 - 14:00">01:00 - 02:00 PM</option>
                  <option value="14:00 - 15:00">02:00 - 03:00 PM</option>
                  <option value="15:00 - 16:00">03:00 - 04:00 PM</option>
                  <option value="16:00 - 17:00">04:00 - 05:00 PM</option>
                  <option value="17:00 - 18:00">05:00 - 06:00 PM</option>
                  <option value="18:00 - 19:00">06:00 - 07:00 PM</option>
                  <option value="19:00 - 20:00">07:00 - 08:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold transition"
              >
                {loading ? 'Adding...' : 'Add Time Slot'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Add multiple time slots to give mentees more options. You can always remove slots later if needed.
              </p>
            </div>
          </div>

          {/* Current Availability */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                📅
              </span>
              Your Available Slots ({availability.length})
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {availability.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg">No availability set yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add your first time slot to start receiving booking requests
                  </p>
                </div>
              ) : (
                Object.keys(groupedAvailability)
                  .sort()
                  .map((date) => (
                    <div key={date} className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="mr-2">📆</span>
                        {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                      <div className="space-y-2">
                        {groupedAvailability[date].map((slot) => (
                          <div
                            key={slot._id}
                            className="flex justify-between items-center p-3 bg-white rounded-lg border"
                          >
                            <div className="flex items-center">
                              <span className="text-indigo-600 mr-3">🕐</span>
                              <span className="font-medium text-gray-800">{slot.timeSlot}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteSlot(slot._id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;
