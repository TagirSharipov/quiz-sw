import { Question } from "../types";

export const fetchQuestions = async (): Promise<Question[]> => {
  //const response = await fetch("/api.php?mode=p");
  const response = await fetch("https://opentdb.com/api.php?amount=10");
  const data = await response.json();

  return data.results;
};
