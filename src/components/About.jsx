import { useState, useEffect } from 'react';

const About = () => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [examDate, setExamDate] = useState(null);
  const [isEditingDate, setIsEditingDate] = useState(false);

  useEffect(() => {
    // Load exam date from localStorage or set default
    const savedDate = localStorage.getItem('examDate');
    if (savedDate) {
      setExamDate(new Date(savedDate));
    } else {
      const defaultDate = new Date('2025-01-01');
      setExamDate(defaultDate);
      localStorage.setItem('examDate', defaultDate.toISOString());
    }
  }, []);

  useEffect(() => {
    if (!examDate) return;

    const calculateDaysLeft = () => {
      const today = new Date();
      const diffTime = examDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };

    calculateDaysLeft();
    // Update days left every day
    const interval = setInterval(calculateDaysLeft, 86400000);
    return () => clearInterval(interval);
  }, [examDate]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setExamDate(newDate);
    localStorage.setItem('examDate', newDate.toISOString());
    setIsEditingDate(false);
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const certificationDetails = [
    { label: 'Certification', value: 'AWS Certified Solutions Architect - Associate (SAA-C03)', icon: '🏆' },
    { label: 'Validity', value: '3 years', icon: '📅' },
    { label: 'Exam Duration', value: '130 minutes', icon: '⏱️' },
    { label: 'Questions', value: '65 questions', icon: '❓' },
    { label: 'Passing Score', value: '72%', icon: '🎯' },
    { label: 'Cost', value: '$150 USD', icon: '💰' },
    { label: 'Languages', value: 'English, Japanese, Korean, Simplified Chinese', icon: '🌐' },
  ];

  const examTopics = [
    { 
      title: 'Design Secure Architectures',
      description: 'Identity & access management, data protection, network security',
      icon: '🔒',
      color: 'from-red-500 to-pink-500'
    },
    { 
      title: 'Design Resilient Architectures',
      description: 'High availability, fault tolerance, disaster recovery',
      icon: '🛡️',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      title: 'Design High-Performing Architectures',
      description: 'Scalability, performance optimization, caching strategies',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      title: 'Design Cost-Optimized Architectures',
      description: 'Cost management, resource optimization, pricing models',
      icon: '💡',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const motivationalQuotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Passion"
    },
    {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance"
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams"
    },
    {
      quote: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
      category: "Authenticity"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Author Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="font-semibold text-gray-900">NganLT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">AWS SAA Practice Platform</p>
              <p className="text-xs text-gray-400">About & Certification Info</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Certification Information
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            AWS Solutions Architect
            <span className="block text-indigo-600">Associate Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive guide to AWS SAA-C03 certification success. 
            Track your progress and stay motivated on your cloud architecture journey.
          </p>
        </div>

        {/* Exam Countdown */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 mb-16 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-3xl font-bold">Exam Countdown</h2>
            </div>
            
            {/* Date Selection */}
            <div className="mb-6">
              {!isEditingDate ? (
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-lg opacity-90">
                    Exam Date: {examDate?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <button
                    onClick={() => setIsEditingDate(true)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Change Date</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <input
                    type="date"
                    value={formatDateForInput(examDate)}
                    onChange={handleDateChange}
                    className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <button
                    onClick={() => setIsEditingDate(false)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {daysLeft > 0 ? daysLeft : daysLeft === 0 ? 'TODAY!' : 'PAST'}
            </div>
            <p className="text-xl opacity-90">
              {daysLeft > 0 ? `Days until your exam` : 
               daysLeft === 0 ? 'Your exam is today! Good luck!' : 
               'Your exam date has passed'}
            </p>
            
            {daysLeft > 0 && (
              <div className="mt-6 flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.floor(daysLeft / 30)}</div>
                  <div className="text-sm opacity-75">Months</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.floor((daysLeft % 30) / 7)}</div>
                  <div className="text-sm opacity-75">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{daysLeft % 7}</div>
                  <div className="text-sm opacity-75">Days</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Certificate Image */}
          <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              {/* <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">🏅</span>
                AWS Certificate Preview
              </h2> */}
            </div>
            <div className="px-6 pb-6">
              <img 
                src="/cert.jpg" 
                alt="AWS Solutions Architect Associate Certificate" 
                className="w-full h-auto rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Certification Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">📋</span>
              Certification Details
            </h2>
            <div className="space-y-4">
              {certificationDetails.map((detail, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{detail.icon}</span>
                    <span className="text-gray-700 font-medium">{detail.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-right">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exam Topics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Exam Domains</h2>
            <p className="text-gray-600">Master these four essential areas for certification success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examTopics.map((topic, index) => (
              <div key={index} className="group relative bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${topic.color} rounded-xl flex items-center justify-center mr-4 text-white text-xl`}>
                      {topic.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{topic.title}</h3>
                      <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Study Strategy</h2>
            <p className="text-gray-600">Proven approaches to maximize your exam preparation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-green-800 mb-3 text-lg">Practice Regularly</h3>
              <p className="text-green-700 leading-relaxed">Dedicate at least 2 hours daily to practice questions and review concepts. Consistency is key to retention.</p>
            </div>
            
            <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="font-bold text-blue-800 mb-3 text-lg">Hands-on Experience</h3>
              <p className="text-blue-700 leading-relaxed">Use AWS Free Tier to practice and understand services practically. Theory plus practice equals mastery.</p>
            </div>
            
            <div className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-purple-800 mb-3 text-lg">Review Weak Areas</h3>
              <p className="text-purple-700 leading-relaxed">Focus on domains where you score less than 80% in practice tests. Turn weaknesses into strengths.</p>
            </div>
          </div>
        </div>

        {/* Motivational Quotes */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Motivated</h2>
            <p className="text-lg opacity-90">Words of wisdom to fuel your certification journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {motivationalQuotes.map((item, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
                <blockquote className="text-lg italic mb-4 leading-relaxed">
                  "{item.quote}"
                </blockquote>
                <cite className="text-sm opacity-75 font-medium">— {item.author}</cite>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>© 2024 AWS SAA Practice Platform by NganLT. Your journey to cloud architecture mastery starts here.</p>
        </div>
      </div>
    </div>
  );
};

export default About; 