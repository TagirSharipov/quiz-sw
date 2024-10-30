export type Question = {
  category: string;
  difficulty:string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

export type UserAnswer = {
  response: string;
  confirmed: boolean;
};
