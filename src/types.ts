export type Question = {
  id: number;
  group: string;
  order: number;
  question: string;
  answers: { answer: string; isCorrect: boolean }[];
};

export type UserAnswer = {
  response: string;
  confirmed: boolean;
};
