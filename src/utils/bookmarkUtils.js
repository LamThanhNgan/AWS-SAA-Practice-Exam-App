// Utility functions for bookmark management

export const saveBookmarksToStorage = (bookmarks, examType, examNumber = null) => {
  try {
    const key = examNumber 
      ? `bookmarks_${examType}_exam_${examNumber}` 
      : `bookmarks_${examType}`;
    localStorage.setItem(key, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks to storage:', error);
  }
};

export const loadBookmarksFromStorage = (examType, examNumber = null) => {
  try {
    const key = examNumber 
      ? `bookmarks_${examType}_exam_${examNumber}` 
      : `bookmarks_${examType}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading bookmarks from storage:', error);
    return [];
  }
};

export const clearBookmarksFromStorage = (examType, examNumber = null) => {
  try {
    const key = examNumber 
      ? `bookmarks_${examType}_exam_${examNumber}` 
      : `bookmarks_${examType}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing bookmarks from storage:', error);
  }
};

export const getBookmarkStats = (bookmarks, totalQuestions) => {
  return {
    total: bookmarks.length,
    percentage: totalQuestions > 0 ? Math.round((bookmarks.length / totalQuestions) * 100) : 0,
    remaining: totalQuestions - bookmarks.length
  };
}; 