import React from "react";
import { AnswerObject } from "../../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestion: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestion,
}) => {
  console.log("Re-Rendering");
  return (
    <Wrapper>
      <p>
        Number : {questionNo} /{totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer, index) => (
          <div key={`ans-${index}`}>
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={!!userAnswer}
                value={answer}
                onClick={callback}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></button>{" "}
            </ButtonWrapper>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
export default QuestionCard;
