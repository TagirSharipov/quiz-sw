import { useEffect, useRef, useState } from "react";
import { fetchQuestions } from "../ api/api";
import { Question } from "../types";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetched = useRef(false); //to prevent occasional data re-fetching. Cab be removed if not needed

  useEffect(() => {
    if (fetched.current) return;
    fetchQuestions()
      .then(res => res.json())
      .then(response => {
        setQuestions(response);
        fetched.current = true;
      })
      .catch(err => {
        throw err;
      });
  }, [fetched]);
  return questions;
}
