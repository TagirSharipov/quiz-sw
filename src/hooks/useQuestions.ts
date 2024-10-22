import { useEffect, useState } from "react";
import { fetchQuestions } from "../ api/api";
import { Question } from "../types";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions()
      .then(res => res.json())
      .then(response => {
        setQuestions(response);
      })
      .catch(err => {
        throw err;
      });
  }, []);
  return questions;
}
