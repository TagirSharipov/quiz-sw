import { Card } from "primereact/card";
import { Question, UserAnswer } from "../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
type Props = {
  userAnswers: UserAnswer[];
  questions: Question[];
};
export default function Results({ userAnswers, questions }: Props) {
  const score = userAnswers.reduce((acc, { response }, index) => {
    const correctAnswer = questions[index].answers.find(answer => answer.isCorrect)?.answer;
    return acc + (response === correctAnswer ? 1 : 0);
  }, 0);
  
  return (
    <>
      
        <h2 className="text-left">Il tuo punteggio: {Math.floor(score / questions.length * 100)} %</h2>
     
      {questions.map((q, index) => {
        const { answers = [], question = "", group = "" } = q || {};
        const { response = ""} = userAnswers[index] || {};

        return (
          
              
          <Card className="mt-3" key={`question-${index}`}>
            <div className="text-right">Domanda {index + 1}</div>
            <p>{group}</p>
            <p>{question}</p>
            <div className="flex flex-column gap-3">
              <ul>
                {answers.map(({ answer, isCorrect }, index) => (
                  <li
                    key={`answer-${index}`}
                    className="flex align-items-center"
                  >
                    <span>- {answer}</span>
                    {response === answer && (
                      <Tag
                        className="ml-2"
                        severity={isCorrect ? "success" : "danger"}
                      >
                        Risposta
                      </Tag>
                    )}
                    {Boolean(isCorrect) && (
                      <Tag className="ml-2" severity="success">
                        ✔
                      </Tag>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          
          
        );
      })}
    </>
  );
}
