export const fetchQuestions = async () => {
  const response = await fetch("/api.php?mode=p");

  return response;
};
