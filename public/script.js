let currentQuestion = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
    try {
        const response = await fetch("/questions");
        questions = await response.json();
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
        questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

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

function selectOption(index) {
    const options = document.querySelectorAll("#options-container button");
    options.forEach((option, i) => {
        option.classList.toggle("selected", i === index);
    });
}

function submitAnswer() {
    const selectedOption = document.querySelector("#options-container button.selected");
    if (selectedOption) {
        const answer = selectedOption.textContent;
        if (answer === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        displayQuestion();
    } else {
        alert("Please select an answer");
    }
}

function showResult() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: <span style="color: #ffcc00; font-size: 22px;">${score} / ${questions.length}</span></p>
        <button id="restart-btn">Play Again</button>
    `;

    document.getElementById("restart-btn").onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz-container").innerHTML = `
        <h1>Quiz Game</h1>
        <div id="question-counter"></div>
        <div id="question-container"></div>
        <div id="options-container"></div>
        <button id="submit-btn" class="hidden">Submit</button>
        <div id="result"></div>
    `;

    fetchQuestions();
}
fetchQuestions();