import Papa from 'papaparse';

export const parseQuestions = async () => {
  try {
    const response = await fetch('/data/questions.csv');
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const questions = result.data.map((row, index) => ({
            id: index + 1,
            question: row.Question,
            options: {
              A: row['Option A'],
              B: row['Option B'],
              C: row['Option C'],
              D: row['Option D'],
            },
            correctAnswer: row['Correct Answer'],
            explanation: row.Explanation,
          }));
          resolve(questions);
        },
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    console.error('Error fetching CSV:', error);
    return [];
  }
};