let currentQuestionIndex = 0;
let selectedAnswers = {};
let examQuestions = [];
let timer;
let timePerQuestion = 45; // seconds
let timeLeft = timePerQuestion;

const questionContainer = document.getElementById("question-container");
const timerDisplay = document.getElementById("timer");
const resultSection = document.getElementById("result-section");
const totalQuestions = 15; // Fixed RTO exam format

// Load questions from JSON
fetch('../data/mcqs.json')
  .then(res => res.json())
  .then(data => {
    shuffleArray(data);
    examQuestions = data.slice(0, totalQuestions);
    displayQuestion();
    startTimer();
  })
  .catch(err => {
    questionContainer.innerHTML = "<p>Error loading questions.</p>";
    console.error(err);
  });

// Display current question
function displayQuestion() {
  const q = examQuestions[currentQuestionIndex];
  const questionHtml = `
    <h3>Q${currentQuestionIndex + 1}: ${q.question}</h3>
    <ul class="options">
      ${q.options.map((opt, idx) => `
        <li>
          <label>
            <input type="radio" name="option" value="${idx}" ${selectedAnswers[currentQuestionIndex] == idx ? 'checked' : ''}>
            ${opt}
          </label>
        </li>
      `).join('')}
    </ul>
    <div class="nav-buttons">
      <button onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
      <button onclick="nextQuestion()">${currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}</button>
    </div>
  `;
  questionContainer.innerHTML = questionHtml;
}

// Save selected option
function saveAnswer() {
  const options = document.getElementsByName('option');
  options.forEach((opt, idx) => {
    if (opt.checked) {
      selectedAnswers[currentQuestionIndex] = idx;
    }
  });
}

// Next
function nextQuestion() {
  saveAnswer();

  if (currentQuestionIndex === totalQuestions - 1) {
    endExam();
  } else {
    currentQuestionIndex++;
    timeLeft = timePerQuestion;
    displayQuestion();
  }
}

// Previous
function prevQuestion() {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    timeLeft = timePerQuestion;
    displayQuestion();
  }
}

// Timer
function startTimer() {
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      nextQuestion();
    }
  }, 1000);
}

// Stop and show result
function endExam() {
  clearInterval(timer);
  saveAnswer();

  let score = 0;
  examQuestions.forEach((q, i) => {
    if (selectedAnswers[i] == q.answer) {
      score++;
    }
  });

  questionContainer.style.display = "none";
  resultSection.innerHTML = `
    <h2>Exam Completed</h2>
    <p>You scored ${score} out of ${totalQuestions}</p>
    <button onclick="location.reload()">Retake Exam</button>
  `;
}

// Shuffle questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
