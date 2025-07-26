import { useState, useEffect } from 'react';

const About = () => {
  const [daysLeft, setDaysLeft] = useState(0);
  const examDate = new Date('2025-06-09');

  useEffect(() => {
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
  }, []);

  const certificationDetails = [
    { label: 'Certification', value: 'AWS Certified Solutions Architect - Associate (SAA-C03)' },
    { label: 'Validity', value: '3 years' },
    { label: 'Exam Duration', value: '130 minutes' },
    { label: 'Questions', value: '65 questions' },
    { label: 'Passing Score', value: '72%' },
    { label: 'Cost', value: '$150 USD' },
    { label: 'Languages', value: 'English, Japanese, Korean, Simplified Chinese' },
  ];

  const examTopics = [
    'Design Secure Architectures',
    'Design Resilient Architectures',
    'Design High-Performing Architectures',
    'Design Cost-Optimized Architectures',
  ];

  const motivationalQuotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
    '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
    '"Your time is limited, don\'t waste it living someone else\'s life." - Steve Jobs',
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AWS Solutions Architect Associate</h1>
        <p className="text-xl text-gray-600">Your Path to Cloud Architecture Excellence</p>
      </div>

      {/* Exam Countdown */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 mb-12 text-white shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Exam Countdown</h2>
          <div className="text-6xl font-bold mb-4">{daysLeft}</div>
          <p className="text-xl">Days until your exam on {examDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Certificate Image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src="/cert.jpg" 
            alt="AWS Solutions Architect Associate Certificate" 
            className="w-full h-auto"
          />
        </div>

        {/* Certification Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certification Details</h2>
          <div className="space-y-4">
            {certificationDetails.map((detail, index) => (
              <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600">{detail.label}</span>
                <span className="font-medium text-gray-900">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Topics */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Exam Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examTopics.map((topic, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <span className="text-gray-800">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Practice Regularly</h3>
            <p className="text-green-700">Dedicate at least 2 hours daily to practice questions and review concepts.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Hands-on Experience</h3>
            <p className="text-blue-700">Use AWS Free Tier to practice and understand services practically.</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Review Weak Areas</h3>
            <p className="text-purple-700">Focus on domains where you score less than 80% in practice tests.</p>
          </div>
        </div>
      </div>

      {/* Motivational Quotes */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Stay Motivated</h2>
        <div className="space-y-4">
          {motivationalQuotes.map((quote, index) => (
            <div key={index} className="text-center italic text-lg">
              {quote}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 