import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import questions from '../data/questions';
import { saveQuizProgress, getQuizProgress } from '../services/dbService';

const Questions = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize user answers from IndexedDB
  useEffect(() => {
    if (!currentUser) return;

    const loadQuizProgress = async () => {
      try {
        // Check if there is saved progress in the database
        const savedProgress = await db.table('quizProgress')
          .where('userId')
          .equals(currentUser.id)
          .first();

        if (savedProgress) {
          // Load saved progress
          if (savedProgress.answers) {
            setUserAnswers(savedProgress.answers);
          }

          if (savedProgress.currentQuestion !== undefined) {
            setCurrentQuestion(savedProgress.currentQuestion);
          }

          if (savedProgress.showResults !== undefined) {
            setShowResults(savedProgress.showResults);
          }

          if (savedProgress.score !== undefined) {
            setScore(savedProgress.score);
          }
        } else {
          // Initialize with empty answers
          setUserAnswers(new Array(questions.length).fill(''));
        }
      } catch (error) {
        console.error('Error loading quiz progress:', error);
        // Fallback to empty answers
        setUserAnswers(new Array(questions.length).fill(''));
      }
    };

    loadQuizProgress();
  }, [currentUser]);

  // Save answers to IndexedDB whenever they change
  useEffect(() => {
    if (userAnswers.length > 0 && currentUser) {
      const saveProgress = async () => {
        try {
          // Check if progress exists
          const existingProgress = await db.table('quizProgress')
            .where('userId')
            .equals(currentUser.id)
            .first();

          const progressData = {
            userId: currentUser.id,
            answers: userAnswers,
            currentQuestion: currentQuestion,
            showResults: showResults,
            score: score,
            lastUpdated: new Date().toISOString()
          };

          if (existingProgress) {
            // Update existing progress
            await db.table('quizProgress').update(existingProgress.id, progressData);
          } else {
            // Create new progress
            await db.table('quizProgress').add(progressData);
          }
        } catch (error) {
          console.error('Error saving quiz progress:', error);
          // Fallback to localStorage
          localStorage.setItem(`answers_${currentUser.id}`, JSON.stringify(userAnswers));
          localStorage.setItem(`currentQuestion_${currentUser.id}`, currentQuestion.toString());
          localStorage.setItem(`showResults_${currentUser.id}`, JSON.stringify(showResults));
          localStorage.setItem(`score_${currentUser.id}`, score.toString());
        }
      };

      saveProgress();
    }
  }, [userAnswers, currentQuestion, showResults, score, currentUser]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let newScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const handleReset = async () => {
    // Reset all answers
    setUserAnswers(new Array(questions.length).fill(''));
    setCurrentQuestion(0);
    setShowResults(false);
    setScore(0);

    try {
      // Clear progress from IndexedDB for this user
      const existingProgress = await db.table('quizProgress')
        .where('userId')
        .equals(currentUser.id)
        .first();

      if (existingProgress) {
        await db.table('quizProgress').delete(existingProgress.id);
      }

      // Also clear any localStorage fallback data
      localStorage.removeItem(`answers_${currentUser.id}`);
      localStorage.removeItem(`currentQuestion_${currentUser.id}`);
      localStorage.removeItem(`showResults_${currentUser.id}`);
      localStorage.removeItem(`score_${currentUser.id}`);
    } catch (error) {
      console.error('Error resetting quiz progress:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If no user is logged in, redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h2>Quiz Questions</h2>
        <div className="user-info">
          <p>Welcome, {currentUser.name}</p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {showResults ? (
        <div className="results-container">
          <h3>Quiz Results</h3>
          <p className="score">
            Your score: {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>

          <div className="results-list">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`result-item ${userAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`}
              >
                <p className="question-text">
                  <span className="question-number">{index + 1}.</span> {question.question}
                </p>
                <p className="answer-info">
                  Your answer: <strong>{userAnswers[index] || 'Not answered'}</strong>
                </p>
                <p className="answer-info">
                  Correct answer: <strong>{question.correctAnswer}</strong>
                </p>
              </div>
            ))}
          </div>

          <button onClick={handleReset} className="reset-button">
            Reset Quiz
          </button>
        </div>
      ) : (
        <div className="question-card">
          <div className="question-progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <h3 className="question-text">{questions[currentQuestion].question}</h3>

          <div className="options-list">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${userAnswers[currentQuestion] === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="navigation-buttons">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="nav-button"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="submit-button"
                disabled={userAnswers.some(answer => answer === '')}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="nav-button"
              >
                Next
              </button>
            )}
          </div>

          <div className="question-navigation">
            {Array.from({ length: questions.length }, (_, i) => (
              <div
                key={i}
                className={`question-dot ${i === currentQuestion ? 'active' : ''} ${userAnswers[i] ? 'answered' : ''}`}
                onClick={() => setCurrentQuestion(i)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
