import { createContext, useState, useEffect } from 'react';
import { parseQuestions } from '../utils/parseCSV';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const parsedQuestions = await parseQuestions();
      setQuestions(parsedQuestions);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  const addBookmark = (questionId) => {
    setBookmarks(prev => {
      if (!prev.includes(questionId)) {
        return [...prev, questionId];
      }
      return prev;
    });
  };

  const removeBookmark = (questionId) => {
    setBookmarks(prev => prev.filter(id => id !== questionId));
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const isBookmarked = (questionId) => {
    return bookmarks.includes(questionId);
  };

  return (
    <QuestionContext.Provider value={{ 
      questions, 
      loading, 
      bookmarks,
      addBookmark,
      removeBookmark,
      clearBookmarks,
      isBookmarked
    }}>
      {children}
    </QuestionContext.Provider>
  );
};