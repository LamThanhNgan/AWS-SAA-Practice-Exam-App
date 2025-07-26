import { useContext, useState } from 'react';
import { QuestionContext } from '../context/QuestionContext';

const BookmarksPanel = ({ examQuestions, currentQuestionIndex, setCurrentQuestionIndex, onClose }) => {
  const { bookmarks, removeBookmark } = useContext(QuestionContext);
  const [isOpen, setIsOpen] = useState(false);

  const bookmarkedQuestions = examQuestions.filter(q => bookmarks.includes(q.id));

  const handleNavigateToQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleRemoveBookmark = (e, questionId) => {
    e.stopPropagation();
    removeBookmark(questionId);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
        title="View bookmarks"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        {bookmarks.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {bookmarks.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Bookmarks ({bookmarkedQuestions.length})
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {bookmarkedQuestions.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <p className="text-gray-500 text-sm">
                No bookmarked questions yet. Mark a question to review later!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarkedQuestions.map((question) => {
                const questionIndex = examQuestions.findIndex(q => q.id === question.id);
                return (
                  <div
                    key={question.id}
                    onClick={() => handleNavigateToQuestion(questionIndex)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      questionIndex === currentQuestionIndex
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {questionIndex + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          Question {questionIndex + 1}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {question.question.substring(0, 60)}...
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveBookmark(e, question.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove bookmark"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPanel; 