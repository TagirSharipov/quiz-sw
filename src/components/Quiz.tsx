import { useEffect, useMemo, useState } from "react";

import { Question, UserAnswer } from "../types";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ProgressBar from "./ProgressBar";
import Results from "./Results";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchQuestions } from "../ api/api";
import Answer from "./Answer";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const queryClient = useQueryClient();

  // Queries
  const {
    isPending,
    data: questions,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
    initialData: [],
    select: shuffleAnswers,
  });

  const finished = useMemo(
    () =>
      questions?.length > 0 &&
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

  const {
    answers = [],
    correct_answer = "",
    question = "",
  } = questions[currentIndex] || {};
  const { response = "", confirmed = false } = userAnswers[currentIndex] || {};

  /*   const onConfirm = () => {
    setUserAnswers(prev => {
      const arr = [...prev];
      arr[currentIndex] = { ...arr[currentIndex], confirmed: true };
      return arr;
    });
  }; */

  const restart = () => {
    queryClient.invalidateQueries({ queryKey: ["questions"] }).then(() => {
      setCurrentIndex(0);
      setUserAnswers([]);
    });
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

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <ProgressBar answers={userAnswers} questions={questions} />
      <Card className="mt-3">
        {/*<div className="text-right">
          Domanda {currentIndex + 1} da {questions.length}
        </div>*/}

        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-column gap-1">
          {answers.map((answer, index) => (
            <Answer
              key={`answer${index}`}
              answer={answer}
              onAnswer={onAnswer}
              correct_answer={correct_answer}
              response={response}
            />
          ))}
        </div>
      </Card>

      <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
        <Button
          label="Back"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
        />

        <Button
          label="Next"
          onClick={() => setCurrentIndex(prev => prev + 1)}
          disabled={!confirmed || currentIndex === questions.length - 1}
        />
        {finished && <Button label="Restart" onClick={restart} />}
      </div>

      {finished && (
        <>
          <Results userAnswers={userAnswers} questions={questions} />
          <Button className="mt-3" label="Restart" onClick={restart} />
        </>
      )}
    </div>
  );
};

export default Quiz;

const shuffleAnswers = (questions: Question[]) => {
  const res = [...questions];
  return res.map(q => {
    const { incorrect_answers = [], correct_answer = "" } = q;
    const i = Math.floor(Math.random() * incorrect_answers?.length);

    const answers = [...incorrect_answers];
    answers.splice(i, 0, correct_answer);
    return { ...q, answers };
  });
};
