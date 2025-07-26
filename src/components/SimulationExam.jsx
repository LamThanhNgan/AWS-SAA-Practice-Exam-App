import { useContext, useState, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import BookmarkButton from './BookmarkButton';
import BookmarksPanel from './BookmarksPanel';
import ResultModal from './ResultModal';
import ConfirmDialog from './ConfirmDialog';

const calculateDomainScores = (answers, questions) => {
  const domainQuestions = {
    'Identity and Access Management': [],
    'Compute and Network Services': [],
    'Storage Solutions': [],
    'Database Services': [],
    'Application Integration': []
  };

  questions.forEach(q => {
    const domain = q.domain || 'Identity and Access Management';
    domainQuestions[domain].push(q);
  });

  const domainScores = {};
  Object.entries(domainQuestions).forEach(([domain, questions]) => {
    if (questions.length === 0) return;

    const correctCount = questions.reduce((count, q) => {
      return count + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    domainScores[domain] = Math.round((correctCount / questions.length) * 100);
  });

  return domainScores;
};

const calculateTimeAnalysis = (answers, timeLeft, totalQuestions) => {
  const totalTime = 130 * 60;
  const timeSpent = totalTime - timeLeft;
  const answeredQuestions = Object.keys(answers).length;

  return {
    averageTimePerQuestion: answeredQuestions > 0 ? Math.round(timeSpent / answeredQuestions) : 0,
    questionsRevisited: 0,
    unansweredQuestions: totalQuestions - answeredQuestions
  };
};

// Function to randomly shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SimulationExam = () => {
  const { questions, loading, clearBookmarks } = useContext(QuestionContext);
  const totalQuestions = 65;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(130 * 60);
  const userName = localStorage.getItem('userName') || 'User';
  const [showResult, setShowResult] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [questionVisits, setQuestionVisits] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  
  // Generate random questions when component mounts
  useEffect(() => {
    if (!loading && questions.length > 0) {
      const randomQuestions = shuffleArray(questions).slice(0, totalQuestions);
      setExamQuestions(randomQuestions);
    }
  }, [loading, questions, totalQuestions]);

  // Timer effect
  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && examStarted) {
      handleConfirmSubmit();
    }
  }, [timeLeft, examStarted]);

  // Track question visits - moved to top with all other hooks
  useEffect(() => {
    if (examStarted && examQuestions.length > 0 && examQuestions[currentQuestionIndex]) {
      const currentQuestion = examQuestions[currentQuestionIndex];
      setQuestionVisits(prev => ({
        ...prev,
        [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1
      }));
    }
  }, [currentQuestionIndex, examStarted, examQuestions]);

  // NOW WE CAN HAVE CONDITIONAL RETURNS AFTER ALL HOOKS

  // Early return with loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Early return if no questions available
  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-600">No questions available. Please check your question data.</p>
        </div>
      </div>
    );
  }

  // Early return if examQuestions not ready
  if (examQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing exam questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];

  // Safety check for currentQuestion
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-600">Error: Unable to load current question.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleOptionSelect = (option) => {
    if (!examStarted) return;
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

  const getUnansweredCount = () => {
    return totalQuestions - Object.keys(selectedAnswers).length;
  };

  const calculateScore = () => {
    let correctCount = 0;
    examQuestions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQuestions) * 100);
  };

  const calculateScoreDetails = () => {
    const domainScores = calculateDomainScores(selectedAnswers, examQuestions);
    const timeAnalysis = calculateTimeAnalysis(selectedAnswers, timeLeft, totalQuestions);
    timeAnalysis.questionsRevisited = Object.values(questionVisits).filter(visits => visits > 1).length;

    return {
      domainScores,
      timeAnalysis
    };
  };

  const handleSubmitClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmDialog(false);
    const score = calculateScore();
    setExamScore(score);
    setShowResult(true);
    clearBookmarks();
  };

  const handleCloseConfirm = () => {
    setShowConfirmDialog(false);
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  const handleStartNewExam = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(130 * 60);
    setShowResult(false);
    setExamStarted(false);
    setQuestionVisits({});
    clearBookmarks();
    // Generate new random questions
    if (questions.length > 0) {
      const randomQuestions = shuffleArray(questions).slice(0, totalQuestions);
      setExamQuestions(randomQuestions);
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!examStarted) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Simulation Exam</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Exam Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Time limit: 130 minutes</li>
                <li>• {totalQuestions} random questions</li>
                <li>• Passing score: 72%</li>
                <li>• No breaks or pauses</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm">
                Once started, the timer cannot be paused. Questions are randomly selected from the entire pool each time.
              </p>
            </div>
          </div>
          <button
            onClick={handleStartExam}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Random Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Question Navigation Panel */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 p-4">
        <div className="mb-6">
          <button
            onClick={handleStartNewExam}
            className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            New Random Exam
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {examQuestions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded text-sm flex items-center justify-center ${
                index === currentQuestionIndex
                  ? 'bg-indigo-600 text-white'
                  : selectedAnswers[q.id]
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
            <div className="flex items-center space-x-4">
              <div className="text-gray-600">
                Time Left: {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <BookmarkButton questionId={currentQuestion.id} />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div className="mb-8">
            <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>
            <div className="space-y-3">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleOptionSelect(key)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion.id] === key
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                  }`}
                >
                  <span className="font-medium">{key}.</span> {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <button
              onClick={handlePrevious}
              className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Progress: {progress.toFixed(0)}% | Answered: {Object.keys(selectedAnswers).length}/{totalQuestions}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                Next
              </button>
              <button
                onClick={handleSubmitClick}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={timeLeft === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks Panel */}
      <BookmarksPanel 
        examQuestions={examQuestions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />

      {/* Result Modal */}
      {showResult && (
        <ResultModal
          score={examScore}
          onClose={handleCloseResult}
          examNumber={1}
          userName={userName}
          scoreDetails={calculateScoreDetails()}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmSubmit}
        message={
          getUnansweredCount() === 0
            ? 'Are you sure you want to submit your exam?'
            : 'You still have unanswered questions. Would you like to submit anyway?'
        }
        unansweredCount={getUnansweredCount()}
      />
    </div>
  );
};

export default SimulationExam;