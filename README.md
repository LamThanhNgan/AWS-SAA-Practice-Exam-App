# AWS SAA Practice Exam App

A modern web application for practicing the AWS Certified Solutions Architect – Associate (SAA-C03) exam. Built with React, Vite, Tailwind CSS, and the Context API, this app provides a realistic exam experience, question bookmarking, and detailed explanations to help users focus on challenging topics.

## Features

- **Practice and Simulation Modes**: Choose between practice exams (by set) or a real test simulation (randomized questions).
- **Question Bookmarking**: Mark questions for later review and easily navigate to them during the exam session.
- **Progress Tracking**: Visual progress bar and timer for exam pacing.
- **Detailed Explanations**: Immediate feedback and explanations for each question.
- **Responsive UI**: Clean, mobile-friendly interface styled with Tailwind CSS.
- **CSV-based Question Bank**: Easily update or expand the question set via CSV.

## Architecture Overview

- **React + Vite**: Fast, modern frontend stack with hot module replacement.
- **Context API**: Global state management for questions, answers, and bookmarks.
- **Component-Based**: Modular components for exam, question, results, bookmarks, etc.
- **CSV Parsing**: Uses PapaParse to load questions from `/public/data/questions.csv`.
- **Bookmark System**: Add, remove, and view bookmarks per session; cleared on exam submit.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
cd aws-practice-exam
npm install
```

### Running the App
```bash
npm run dev
```
Visit the local server URL (usually http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Usage
1. **Enter your name and select mode** (Practice or Real Test) on the landing page.
2. **Answer questions** using the provided options.
3. **Bookmark questions** using the star icon to review them later.
4. **Access bookmarks** via the floating bookmark button; jump directly to any bookmarked question.
5. **Submit the exam** to view your score and explanations. Bookmarks are cleared at the end of each session.

## Project Structure
```
aws-practice-exam/
├── public/
│   └── data/
│       ├── questions.csv         # Question bank (CSV)
│       └── ...
├── src/
│   ├── components/              # React components (Exam, Bookmarks, etc.)
│   ├── context/                 # Context API for global state
│   ├── utils/                   # Utility functions (CSV parsing, bookmarks)
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── package.json
├── tailwind.config.js
└── ...
```

## Customization
- **Add/Update Questions**: Edit `public/data/questions.csv`.
- **Styling**: Modify Tailwind classes in components or update `index.css`/`App.css`.

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes.

## License
[MIT](LICENSE) (or specify your license here)

---

*This project is not affiliated with or endorsed by Amazon Web Services (AWS). It is intended for educational and exam preparation purposes only.*
