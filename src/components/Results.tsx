import { Card } from "primereact/card";
import { Question, UserAnswer } from "../types";
import { Tag } from "primereact/tag";
type Props = {
  userAnswers: UserAnswer[];
  questions: Question[];
};
export default function Results({ userAnswers, questions }: Props) {
  const score = userAnswers.reduce((acc, { response }, index) => {
    const correctAnswer = questions[index].correct_answer;
    return acc + (response === correctAnswer ? 1 : 0);
  }, 0);

  const scorePercentile = Math.floor(score / questions.length * 100);
  return (
      <>
        <h2 className="text-left">Il tuo punteggio: {scorePercentile} % {scorePercentile >= 60 ? "Esame superato" : "Esame fallito"}</h2>

        {questions.map((q, index) => {
          const {answers = [], correct_answer = '', question = "", category = ""} = q || {};
          const {response = ""} = userAnswers[index] || {};
          console.log("response", response, correct_answer);
          
          return (
              <Card className="mt-3" key={`question-${index}`}>
                <div className="text-right">Domanda {index + 1} - {category}</div>

                <div className="font-medium" dangerouslySetInnerHTML={{__html: question}}/>
                <div className="flex flex-column gap-3">
                  <ul>
                    {answers.map((answer, index) => (
                        <li
                            key={`answer-${index}`}
                            className="flex align-items-center"
                        >
                          <span>-</span><span dangerouslySetInnerHTML={{__html: answer}}></span>
                          {response === answer && (
                              <Tag
                                  className="ml-2"
                                  severity={correct_answer === response ? "success" : "danger"}
                              >
                                Risposta
                              </Tag>
                          )}
                          {(answer === correct_answer) && (
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
