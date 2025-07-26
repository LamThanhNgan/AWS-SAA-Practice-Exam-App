import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionProvider } from './context/QuestionContext';
import LandingPage from './components/LandingPage';
import PracticeExam from './components/PracticeExam';
import SimulationExam from './components/SimulationExam';

function App() {
  return (
    <QuestionProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/practice" element={<PracticeExam />} />
            <Route path="/simulation" element={<SimulationExam />} />
          </Routes>
        </div>
      </Router>
    </QuestionProvider>
  );
}

export default App;