export const fetchQuestions = async () => {
  //const response = await fetch("/api.php?mode=p");
  const response = await fetch("https://opentdb.com/api.php?amount=10");

  return response;
};
