import { useCallback, useEffect, useRef, useState } from "react";
import { fetchQuestions } from "../ api/api";
import { Question } from "../types";


export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetched = useRef(false); //to prevent occasional data re-fetching. Cab be removed if not needed
  
  const getQuestions = useCallback(() => {
    fetchQuestions()
      .then(res => res.json())
      .then(response => {

         setQuestions(response.results);

      })
      .catch(err => {
        throw err;
      });
  }, []);

  const reFetchQuestions = useCallback(() => {
    getQuestions();
  }, [getQuestions]);

  useEffect(() => {


    fetchQuestions()
    .then(res => {
      //if (!res.ok) throw new Error("Failed to fetch questions");
      return res.json();})
    .then(response => { 

      if ( !fetched.current) setQuestions(mixAnswers(response.results || []));
      fetched.current = true;
    })
    .catch(err => {
      throw err;
    });
   

  }, [fetched, getQuestions]);

  return [questions, reFetchQuestions] as const;
}
const mixAnswers = (questions: Question[]) => {
  const res = [...questions];
 return res.map(q => {
    const { incorrect_answers = [], correct_answer = '' } = q;
    const i = Math.floor(Math.random() * (incorrect_answers?.length ));
  
    const answers = [...incorrect_answers]
    answers.splice(i, 0, correct_answer);
    return {...q, answers};
  });


 
}