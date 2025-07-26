import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultModal = ({ score, onClose, examNumber, userName, scoreDetails }) => {
  const navigate = useNavigate();
  const isPassed = score >= 72;

  // Calculate domain performance percentages
  const domainPerformance = scoreDetails?.domainScores || {
    'Identity and Access Management': 75,
    'Compute and Network Services': 68,
    'Storage Solutions': 80,
    'Database Services': 70,
    'Application Integration': 65
  };

  // Time analysis
  const timeAnalysis = scoreDetails?.timeAnalysis || {
    averageTimePerQuestion: 120, // in seconds
    questionsRevisited: 5,
    unansweredQuestions: 2
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className={`p-6 ${isPassed ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {isPassed ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          <h3 className={`text-2xl font-bold text-center mt-4 ${
            isPassed ? 'text-green-800' : 'text-red-800'
          }`}>
            {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
          </h3>
          <p className="text-center text-gray-600 mt-1">
            {isPassed ? 'You have passed the exam!' : 'You have not passed the exam yet.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overall Score */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Overall Score</span>
              <span className="text-2xl font-bold text-gray-900">{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${isPassed ? 'bg-green-600' : 'bg-red-600'}`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-500">0%</span>
              <span className="text-sm text-gray-500">Passing Score: 72%</span>
              <span className="text-sm text-gray-500">100%</span>
            </div>
          </div>

          {/* Domain Performance */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Domain Performance</h4>
            <div className="space-y-4">
              {Object.entries(domainPerformance).map(([domain, score]) => (
                <div key={domain}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{domain}</span>
                    <span className="text-sm font-medium text-gray-900">{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${score >= 72 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Average Time per Question</div>
              <div className="text-xl font-semibold text-gray-900">
                {Math.floor(timeAnalysis.averageTimePerQuestion / 60)}m {timeAnalysis.averageTimePerQuestion % 60}s
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Questions Revisited</div>
              <div className="text-xl font-semibold text-gray-900">{timeAnalysis.questionsRevisited}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Unanswered Questions</div>
              <div className="text-xl font-semibold text-gray-900">{timeAnalysis.unansweredQuestions}</div>
            </div>
          </div>

          {/* Exam Details */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Exam</span>
              <span className="font-medium text-gray-900">Practice Exam {examNumber}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Candidate</span>
              <span className="font-medium text-gray-900">{userName}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Status</span>
              <span className={`font-medium ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {isPassed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h4>
            <ul className="space-y-2 text-gray-600">
              {!isPassed && (
                <>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Focus on improving your performance in Application Integration and Compute Services
                  </li>
                </>
              )}
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Review explanations for incorrect answers to strengthen understanding
              </li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal; 