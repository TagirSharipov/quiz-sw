import { ProgressBar as PrimeProgressBar } from "primereact/progressbar";

export default function ProgressBar({ answers, questions }) {
  const value = answers.filter(a => a.confirmed).length;

  return (
    <PrimeProgressBar
      value={Math.ceil((value / questions.length) * 100)}
      displayValueTemplate={value => ``}
    />
  );
}
