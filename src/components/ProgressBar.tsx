import { ProgressBar as PrimeProgressBar } from "primereact/progressbar";
import { Question, UserAnswer } from "../types";

export default function ProgressBar({
  answers,
  questions,
}: {
  answers: UserAnswer[];
  questions: Question[];
}) {
  const value = answers.filter(a => a.confirmed).length;

  return (
    <PrimeProgressBar
      value={Math.ceil((value / questions.length) * 100)}
      displayValueTemplate={() => ""}
    />
  );
}
