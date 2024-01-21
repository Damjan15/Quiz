import { useState } from "react";
import questions from "../questions";
import complete from "../assets/quiz-complete.png";

const Quiz = () => {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;


  const handleSelectAnswer = (selectedAnswer) => {
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

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
