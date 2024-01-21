import { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer";
import questions from "../questions";
import complete from "../assets/quiz-complete.png";

const Quiz = () => {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;


  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return <div id="summary">
        <img src={complete} alt="complete image" />
        <h2>Quiz Completed!</h2>
    </div>
  }

  // shuffling Answers
  const shuffledAnswers = [...questions[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{questions[activeQuestionIndex]?.text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
