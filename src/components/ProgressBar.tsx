import { ProgressBar as PrimeProgressBar } from "primereact/progressbar";
import { Question, UserAnswer } from "../types";

type Props = {
  answers: UserAnswer[];
  questions: Question[];
};

export default function ProgressBar({ answers, questions }: Props) {
  const answersLength = answers.filter(a => a.confirmed).length;

  return (
    <PrimeProgressBar
      value={Math.ceil((answersLength / questions.length) * 100)}
      displayValueTemplate={() => `${answersLength}/${questions.length}`}
    />
  );
}
