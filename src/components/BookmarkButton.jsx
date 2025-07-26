import { useContext } from 'react';
import { QuestionContext } from '../context/QuestionContext';

const BookmarkButton = ({ questionId }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useContext(QuestionContext);
  const bookmarked = isBookmarked(questionId);

  const handleToggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(questionId);
    } else {
      addBookmark(questionId);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      className={`p-2 rounded-full transition-colors ${
        bookmarked
          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      }`}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        className="w-5 h-5"
        fill={bookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
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