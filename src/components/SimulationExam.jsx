import { useContext, useState, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import BookmarkButton from './BookmarkButton';
import BookmarksPanel from './BookmarksPanel';

const SimulationExam = () => {
  const { questions, loading, clearBookmarks } = useContext(QuestionContext);
  const totalQuestions = 65;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(130 * 60); // 130 minutes in seconds
  const [examQuestions, setExamQuestions] = useState([]);
  const userName = localStorage.getItem('userName') || 'User';
  const [scores, setScores] = useState({});

  useEffect(() => {
    if (!loading && questions.length > 0) {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      setExamQuestions(shuffled.slice(0, totalQuestions));
    }
  }, [loading, questions]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  if (loading || examQuestions.length === 0) return <p>Loading...</p>;

  const currentQuestion = examQuestions[currentQuestionIndex];
  const handleOptionSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option,
    });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    const correctCount = Object.entries(selectedAnswers).reduce((count, [id, answer]) => {
      const question = examQuestions.find(q => q.id === parseInt(id));
      return count + (question.correctAnswer === answer ? 1 : 0);
    }, 0);
    setScores(prev => ({
      ...prev,
      [userName]: Math.round((correctCount / totalQuestions) * 100),
    }));
    console.log(`${userName} Score: ${correctCount}/${totalQuestions}`);
    // Clear bookmarks when exam is submitted
    clearBookmarks();
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer;

  return (
    <div className="max-w-5xl mx-auto p-6 flex h-screen bg-gray-100">
      <div className="w-1/4 pr-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions</h3>
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {examQuestions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-full text-sm flex items-center justify-center ${
                index === currentQuestionIndex
                  ? 'bg-blue-500 text-white'
                  : selectedAnswers[q.id]
                  ? selectedAnswers[q.id] === examQuestions.find(x => x.id === q.id).correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">AWS SAA Real Test - {userName}</h2>
          <BookmarkButton questionId={currentQuestion.id} />
        </div>
        <div className="flex justify-between items-center mb-6 bg-gray-200 p-3 rounded-md">
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="ml-4 text-sm font-medium text-gray-700">
            {progress.toFixed(1)}% (Time: {minutes}:{seconds.toString().padStart(2, '0')})
          </span>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-800 mb-4">
            Question {currentQuestionIndex + 1}/{totalQuestions}: {currentQuestion.question}
          </p>
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleOptionSelect(key)}
              className={`w-full text-left p-3 mb-3 border rounded-md hover:bg-gray-50 transition-colors ${
                selectedAnswers[currentQuestion.id] === key
                  ? isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
              disabled={selectedAnswers[currentQuestion.id]}
            >
              <span className="font-medium">{key}.</span> {value}
            </button>
          ))}
          {selectedAnswers[currentQuestion.id] && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="font-semibold text-gray-800 text-lg">Explanation:</p>
              <p className="text-gray-600 mt-2">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Current Score: {Object.keys(selectedAnswers).length > 0 ? `${Math.round((Object.values(selectedAnswers).reduce((count, answer) => {
            const question = examQuestions.find(q => q.id === parseInt(Object.keys(selectedAnswers).find(key => selectedAnswers[key] === answer)));
            return count + (question.correctAnswer === answer ? 1 : 0);
          }, 0) / Object.keys(selectedAnswers).length) * 100)}%` : '0%'}</p>
        </div>
        {Object.keys(scores).length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Results</h3>
            <div className="text-gray-700">
              {Object.entries(scores).map(([name, score]) => (
                <p key={name} className="mb-1">{name}: {score}%</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-6 right-6 flex space-x-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={currentQuestionIndex === totalQuestions - 1 || !selectedAnswers[currentQuestion.id]}
        >
          Next
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          disabled={currentQuestionIndex !== totalQuestions - 1 || timeLeft > 0}
        >
          Submit
        </button>
      </div>
      <BookmarksPanel 
        examQuestions={examQuestions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
};

export default SimulationExam;