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

function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const submitButton = document.getElementById("submit-btn");
  const questionCounter = document.getElementById("question-counter");

  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    questionContainer.innerHTML = `<h2>${question.question}</h2>`;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${
      questions.length
    }`;

    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectOption(index);
      optionsContainer.appendChild(button);
    });

    submitButton.classList.remove("hidden");
    submitButton.onclick = submitAnswer;
  } else {
    showResult();
  }
}

function selectOption(index) {}

function submitAnswer() {}

fetchQuestions();
