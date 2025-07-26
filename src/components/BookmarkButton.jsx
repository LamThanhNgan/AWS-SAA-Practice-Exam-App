import { useContext } from 'react';
import { QuestionContext } from '../context/QuestionContext';

const BookmarkButton = ({ questionId }) => {
  const { bookmarks, addBookmark, removeBookmark } = useContext(QuestionContext);
  const isBookmarked = bookmarks.includes(questionId);

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(questionId);
    } else {
      addBookmark(questionId);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      className={`p-2 rounded-lg transition-colors ${
        isBookmarked
          ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
          : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
      }`}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
};

export default BookmarkButton; 