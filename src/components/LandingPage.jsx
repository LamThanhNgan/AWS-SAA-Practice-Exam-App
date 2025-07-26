import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [userName, setUserName] = useState('');
  const [mode, setMode] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (userName && mode) {
      localStorage.setItem('userName', userName);
      navigate(mode === 'practice' ? '/practice' : '/simulation');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">AWS SAA Practice Test</h2>
      <div className="mb-4">
        <label className="block mb-2">Enter Your Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., John Doe"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Mode</option>
          <option value="practice">Practice Exams</option>
          <option value="simulation">Real Test</option>
        </select>
      </div>
      <button
        onClick={handleStart}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        disabled={!userName || !mode}
      >
        Start
      </button>
    </div>
  );
};

export default LandingPage;
