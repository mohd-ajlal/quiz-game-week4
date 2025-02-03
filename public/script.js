let currentQuestion = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch("/questions.json");
    questions = await response.json();
    console.log("Questions:", questions);
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestion() {}

fetchQuestions();
