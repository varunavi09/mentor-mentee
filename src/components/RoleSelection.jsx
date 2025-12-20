import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'mentor',
      title: 'I am a Mentor',
      description: 'Share your expertise and guide aspiring professionals',
      icon: '👨‍🏫',
      features: [
        'Set your availability',
        'Accept session requests',
        'Conduct video mentoring',
        'Build your reputation'
      ],
      gradient: 'from-indigo-500 to-purple-600',
      hoverGradient: 'hover:from-indigo-600 hover:to-purple-700'
    },
    {
      id: 'mentee',
      title: 'I am a Mentee',
      description: 'Connect with experienced mentors and accelerate your growth',
      icon: '👨‍🎓',
      features: [
        'Browse expert mentors',
        'Book mentoring sessions',
        'Join video calls',
        'Track your progress'
      ],
      gradient: 'from-pink-500 to-rose-600',
      hoverGradient: 'hover:from-pink-600 hover:to-rose-700'
    }
  ];

  const handleRoleSelect = (roleId) => {
    navigate(`/login?role=${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">MC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mentor Connect</h1>
                <p className="text-sm text-gray-500">Smart India Hackathon 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mentor Connect</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Punjab Skill Development Mission's platform connecting skilled professionals with aspiring learners
          </p>
        </div>
        {/* Role Selection Cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Choose Your Journey
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl">{role.icon}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {role.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    className={`w-full py-3 px-6 bg-gradient-to-r ${role.gradient} ${role.hoverGradient} text-white font-semibold rounded-lg transition-all duration-300 transform group-hover:shadow-lg`}
                  >
                    Continue as {role.title.split(' ')[3]}
                    <svg className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Platform Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Scheduling</h4>
              <p className="text-gray-600">Automated calendar booking system with real-time availability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Video Conferencing</h4>
              <p className="text-gray-600">Embedded video calls powered by Jitsi Meet</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Matching</h4>
              <p className="text-gray-600">Find the perfect mentor based on skills and availability</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Active Mentors</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">2000+</div>
            <div className="text-gray-600">Mentees</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">5000+</div>
            <div className="text-gray-600">Sessions</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-3xl font-bold text-rose-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 Mentor Connect | Punjab Skill Development Mission | Smart India Hackathon
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
