import React from "react";
import { RadioButton } from "primereact/radiobutton";
import { v4 } from "uuid";

interface AnswerProps {
  answer: string;
  response: string;
  correct_answer: string;
  onAnswer: (response: string) => void;
}

const Answer: React.FC<AnswerProps> = ({
  answer,
  response,
  correct_answer,
  onAnswer,
}) => {
  const id = v4();
  return (
    <div className="flex align-items-center ">
      <RadioButton
        type="radio"
        name="answers"
        inputId={id}
        value={response}
        checked={response === answer}
        disabled={Boolean(response)}
        onChange={() => onAnswer(answer)}
      />
      <label
        htmlFor={id}
        className={`ml-2 ${color(
          correct_answer === answer,
          Boolean(response)
        )} cursor-pointer flex-grow-1 border-0 ${
          Boolean(response) ? "" : "hover:border-200"
        } border-1 border-round p-2`}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </div>
  );
};

export default Answer;

const color = (isCorrect: boolean, confirmed: boolean) => {
  if (!confirmed) return "";
  if (isCorrect) return "text-green-600";
  return "text-red-600";
};
