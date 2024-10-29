import { useEffect, useMemo, useState } from "react";
import useQuestions from "../hooks/useQuestions";
import { UserAnswer } from "../types";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import ProgressBar from "./ProgressBar";
import Results from "./Results";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, reFetchQuestions] = useQuestions();

  const finished = useMemo(
    () =>
      questions.length > 0 &&
      userAnswers.every(a => a.confirmed) &&
      userAnswers.length === questions.length,
    [userAnswers, questions]
  );

  useEffect(() => {

    if (finished && "serviceWorker" in navigator) {
      navigator.serviceWorker.controller?.postMessage({
        action: "clear-cache",
      });
    }
  }, [finished]);

  const { answers = [], question = "" } = questions[currentIndex] || {};
  const { response = "", confirmed = false } = userAnswers[currentIndex] || {};

  /*   const onConfirm = () => {
    setUserAnswers(prev => {
      const arr = [...prev];
      arr[currentIndex] = { ...arr[currentIndex], confirmed: true };
      return arr;
    });
  }; */
  const restart = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    reFetchQuestions();
  };

  const onAnswer = (response: string) =>
    setUserAnswers(prev => {
      const arr = [...prev];

      arr[currentIndex] = {
        response,
        confirmed: true,
      };

      return arr;
    });

  const color = (isCorrect: boolean) => {
    if (!confirmed) return "";
    if (isCorrect) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div>
      <ProgressBar answers={userAnswers} questions={questions} />
      <Card className="mt-3">
        {/*<div className="text-right">
          Domanda {currentIndex + 1} da {questions.length}
        </div>*/}

        <p>{questions.length > 0 && question}</p>
        <div className="flex flex-column gap-1">
          {answers.map(({ answer, isCorrect }, index) => (
            <div key={`answer-${index}`} className="flex align-items-center ">
              <RadioButton
                type="radio"
                name="answers"
                inputId={`answer-${index}`}
                value={response}
                checked={response === answer}
                disabled={confirmed}
                onChange={() => onAnswer(answer)}
              />
              <label
                htmlFor={`answer-${index}`}
                className={`ml-2 ${color(
                  isCorrect
                )} cursor-pointer flex-grow-1 border-0 ${
                  confirmed ? "" : "hover:border-200"
                } border-1 border-round p-2`}
              >
                {answer}
              </label>
            </div>
          ))}
        </div>
      </Card>

      <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
        <Button
          label="Indietro"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
        />

        <Button
          label="Avanti"
          onClick={() => setCurrentIndex(prev => prev + 1)}
          disabled={!confirmed || currentIndex === questions.length - 1}
        />
              {finished && <Button

            label="Ricomincia"
            onClick={restart}
          />}
      </div>

      {finished && (
        <>
          <Results userAnswers={userAnswers} questions={questions} />
          <Button
            className="mt-3"
            label="Ricomincia"
            onClick={restart}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
