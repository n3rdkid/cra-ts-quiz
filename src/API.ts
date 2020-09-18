import { shuffleArray } from "./util";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuesitonState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endPoint)).json();
  return data.results.map((question: Question) => {
    return {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
  });
};
