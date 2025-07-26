import { useContext, useState } from 'react';
import { QuestionContext } from '../context/QuestionContext';

const BookmarksPanel = ({ examQuestions, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const { bookmarks, removeBookmark } = useContext(QuestionContext);
  const [isOpen, setIsOpen] = useState(false);

  const bookmarkedQuestions = examQuestions.filter(q => bookmarks.includes(q.id));

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-l-lg shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-lg">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Bookmarks</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        {bookmarkedQuestions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No bookmarks yet</p>
        ) : (
          <div className="space-y-4">
            {bookmarkedQuestions.map((question, index) => {
              const questionIndex = examQuestions.findIndex(q => q.id === question.id);
              return (
                <div
                  key={question.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-600">Question {questionIndex + 1}</span>
                    <button
                      onClick={() => removeBookmark(question.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm mb-3 line-clamp-2">{question.question}</p>
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(questionIndex);
                      setIsOpen(false);
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Go to question →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPanel; 