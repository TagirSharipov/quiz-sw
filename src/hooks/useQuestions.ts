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
        setQuestions(response);
        fetched.current = true;
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const reFetchQuestions = useCallback(() => {
    getQuestions();
  }, [getQuestions]);

  useEffect(() => {
    if (fetched.current) return;
    getQuestions();
  }, [fetched, getQuestions]);

  return [questions, reFetchQuestions] as const;
}
