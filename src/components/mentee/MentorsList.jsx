import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import { apiJson } from '../../utils/api';

const MentorsList = ({ user }) => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    filterMentors();
  }, [searchTerm, selectedExpertise, mentors]);

  const fetchMentors = async () => {
    try {
      const data = await apiJson('/api/mentee/mentors');
      setMentors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setLoading(false);
    }
  };

  const filterMentors = () => {
    let filtered = mentors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.expertise.some((exp) =>
            exp.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          mentor.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by expertise
    if (selectedExpertise !== 'all') {
      filtered = filtered.filter((mentor) =>
        mentor.expertise.some((exp) =>
          exp.toLowerCase().includes(selectedExpertise.toLowerCase())
        )
      );
    }

    setFilteredMentors(filtered);
  };

  const getAllExpertise = () => {
    const allExp = mentors.flatMap((m) => m.expertise);
    return [...new Set(allExp)];
  };

  const handleViewMentor = (mentorId) => {
    navigate(`/mentee/mentor/${mentorId}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading mentors..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Mentor</h1>
          <p className="text-gray-600">
            Browse through {mentors.length} experienced professionals ready to guide you
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Mentors
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, expertise, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Expertise
              </label>
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Expertise</option>
                {getAllExpertise().map((exp, idx) => (
                  <option key={idx} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(searchTerm || selectedExpertise !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredMentors.length} mentor(s)
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedExpertise('all');
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No mentors found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find more mentors
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedExpertise('all');
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Show All Mentors
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor._id}
                className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center text-3xl font-bold">
                      {mentor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{mentor.name}</h3>
                      <p className="text-indigo-100 text-sm">{mentor.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Experience Badge */}
                  <div className="mb-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ {mentor.yearsOfExperience}+ years exp.
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
                    {mentor.bio || 'Experienced professional ready to guide you in your career journey.'}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">EXPERTISE</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 3).map((exp, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded"
                        >
                          {exp}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="text-xs text-gray-500 self-center">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <button
                    onClick={() => handleViewMentor(mentor._id)}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    View Profile & Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsList;
