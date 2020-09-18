import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard/QuestionCard.components";
import { fetchQuizQuestions } from "./API";
import { GlobalStyle,Wrapper } from "./App.style";
//Types
import { Difficulty, QuesitonState } from "./API";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuesitonState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuesions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    console.log(newQuesions);
    setQuestions(newQuesions);
    setScore(0);
    setUserAnswers([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User answers
      const answer = e.currentTarget.value;
      //Check answers againg correct answers
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //Move to next question if not on last
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
      return;
    }
    setNumber(nextQuestion);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" type="button" onClick={startQuiz}>
            Start Quiz
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score : {score} </p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNo={number + 1}
            totalQuestion={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button onClick={nextQuestion} className="next">Next Question</button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
