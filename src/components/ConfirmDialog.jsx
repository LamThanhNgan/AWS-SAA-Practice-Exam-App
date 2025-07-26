const ConfirmDialog = ({ isOpen, onClose, onConfirm, message, unansweredCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Confirm Submission
          </h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {unansweredCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 text-sm">
                Warning: You have {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}. 
                These will be marked as incorrect.
              </p>
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 