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

  // Group questions by domain
  questions.forEach(q => {
    const domain = q.domain || 'Identity and Access Management'; // Default domain if not specified
    domainQuestions[domain].push(q);
  });

  // Calculate scores for each domain
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
  const totalTime = 130 * 60; // 130 minutes in seconds
  const timeSpent = totalTime - timeLeft;
  const answeredQuestions = Object.keys(answers).length;

  return {
    averageTimePerQuestion: answeredQuestions > 0 ? Math.round(timeSpent / answeredQuestions) : 0,
    questionsRevisited: 0, // This would need tracking of question visits
    unansweredQuestions: totalQuestions - answeredQuestions
  };
};

const PracticeExam = () => {
  const { questions, loading, clearBookmarks } = useContext(QuestionContext);
  const totalQuestions = 65;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(130 * 60); // 130 minutes in seconds
  const [examNumber, setExamNumber] = useState(1);
  const userName = localStorage.getItem('userName') || 'User';
  const [showResult, setShowResult] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [questionVisits, setQuestionVisits] = useState({}); // Track question visits
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const totalExams = Math.ceil(questions.length / totalQuestions);
  const startIndex = (examNumber - 1) * totalQuestions;
  const examQuestions = questions.slice(startIndex, startIndex + totalQuestions);

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

  // Track question visits
  useEffect(() => {
    setQuestionVisits(prev => ({
      ...prev,
      [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1
    }));
  }, [currentQuestionIndex]);

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
      // No need for else case as unanswered questions are automatically wrong
    });
    return Math.round((correctCount / totalQuestions) * 100);
  };

  const calculateScoreDetails = () => {
    const domainScores = calculateDomainScores(selectedAnswers, examQuestions);
    const timeAnalysis = calculateTimeAnalysis(selectedAnswers, timeLeft, totalQuestions);
    
    // Update time analysis with revisited questions
    timeAnalysis.questionsRevisited = Object.values(questionVisits).filter(visits => visits > 1).length;

    return {
      domainScores,
      timeAnalysis
    };
  };

  const handleSubmitClick = () => {
    const unansweredCount = getUnansweredCount();
    const message = unansweredCount === 0
      ? 'Are you sure you want to submit your exam?'
      : 'You still have unanswered questions. Would you like to submit anyway?';
    
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
    clearBookmarks();
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer;

  return (
    <div className="flex h-full">
      {/* Question Navigation Panel */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 p-4">
        <div className="mb-6">
          <select
            value={examNumber}
            onChange={(e) => {
              setExamNumber(parseInt(e.target.value));
              handleStartNewExam();
            }}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700"
          >
            {Array.from({ length: totalExams }, (_, i) => (
              <option key={i + 1} value={i + 1}>Exam {i + 1}</option>
            ))}
          </select>
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
                  ? selectedAnswers[q.id] === examQuestions.find(x => x.id === q.id).correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
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
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                  }`}
                  disabled={selectedAnswers[currentQuestion.id]}
                >
                  <span className="font-medium">{key}.</span> {value}
                </button>
              ))}
            </div>
          </div>

          {selectedAnswers[currentQuestion.id] && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation</h3>
              <p className="text-gray-600">{currentQuestion.explanation}</p>
            </div>
          )}
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
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestionIndex === totalQuestions - 1 || !selectedAnswers[currentQuestion.id]}
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
          examNumber={examNumber}
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

export default PracticeExam;