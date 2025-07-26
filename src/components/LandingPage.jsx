import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('userName', userName.trim());
      navigate('/practice');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Author Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="font-semibold text-gray-900 text-base">NganLT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">AWS SAA Practice Platform</p>
              <p className="text-xs text-gray-400">Version 1.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-10">
            <div className="inline-flex items-center px-6 py-3 bg-indigo-100 text-indigo-800 rounded-full text-sm lg:text-base font-medium mb-8">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AWS Certification Prep
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            AWS Solutions Architect
            <span className="block text-indigo-600">Associate Exam</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Master your AWS certification with our comprehensive practice platform. 
            Choose between practice mode for learning or simulation mode for exam preparation.
          </p>
        </div>

        {/* Features Grid - Constrained width for cards */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Practice Mode Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-3xl"></div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Practice Mode</h2>
                  <p className="text-green-600 font-semibold text-base lg:text-lg">Learn & Improve</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg">
                Perfect for learning and skill development. Get instant feedback, detailed explanations, 
                and track your progress across different topics.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  { icon: "📚", text: "65 questions per exam set" },
                  { icon: "💡", text: "Detailed explanations for every answer" },
                  { icon: "🔖", text: "Bookmark questions for later review" },
                  { icon: "📊", text: "Progress tracking and analytics" },
                  { icon: "⏰", text: "No time pressure - learn at your pace" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-xl lg:text-2xl mr-4">{feature.icon}</span>
                    <span className="text-gray-700 text-sm lg:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Mode Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-3xl"></div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">Simulation Mode</h2>
                  <p className="text-indigo-600 font-semibold text-base lg:text-lg">Real Exam Experience</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg">
                Experience the real exam conditions with timed tests and authentic formatting. 
                Perfect for final preparation and confidence building.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  { icon: "⏱️", text: "130-minute strict time limit" },
                  { icon: "🎯", text: "65 randomly selected questions" },
                  { icon: "🏆", text: "72% passing score threshold" },
                  { icon: "📈", text: "Comprehensive score analysis" },
                  { icon: "🚫", text: "No breaks or pauses allowed" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-xl lg:text-2xl mr-4">{feature.icon}</span>
                    <span className="text-gray-700 text-sm lg:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 text-base lg:text-lg">Enter your name and choose your preferred learning mode</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-8">
              <label htmlFor="userName" className="block text-sm lg:text-base font-semibold text-gray-700 mb-4">
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-900 placeholder-gray-400 text-sm lg:text-base"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Start Practice Mode
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (userName.trim()) {
                    localStorage.setItem('userName', userName.trim());
                    navigate('/simulation');
                  }
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Simulation Mode
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 max-w-6xl mx-auto">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3">800+</h4>
            <p className="text-gray-600 text-sm lg:text-base">Practice Questions</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3">5</h4>
            <p className="text-gray-600 text-sm lg:text-base">Domain Areas</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3">130</h4>
            <p className="text-gray-600 text-sm lg:text-base">Minutes Per Exam</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm lg:text-base">
          <p>© 2024 AWS SAA Practice Platform by NganLT. Built for AWS certification success.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
