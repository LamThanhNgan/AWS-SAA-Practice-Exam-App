import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuestionProvider } from './context/QuestionContext';
import LandingPage from './components/LandingPage';
import PracticeExam from './components/PracticeExam';
import SimulationExam from './components/SimulationExam';
import About from './components/About';
import Layout from './components/Layout';

function App() {
  return (
    <QuestionProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/practice" element={<PracticeExam />} />
            <Route path="/simulation" element={<SimulationExam />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </QuestionProvider>
  );
}

export default App;