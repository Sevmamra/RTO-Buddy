let quizQuestions = [];
let currentIndex = 0;

const quizContainer = document.getElementById("quiz-container");
const feedbackContainer = document.getElementById("feedback");

fetch('../data/mcqs.json')
  .then(res => res.json())
  .then(data => {
    shuffleArray(data);
    quizQuestions = data;
    displayQuizQuestion();
  })
  .catch(err => {
    quizContainer.innerHTML = "<p>Error loading practice questions.</p>";
    console.error(err);
  });

function displayQuizQuestion() {
  const q = quizQuestions[currentIndex];
  const questionHtml = `
    <h3>Q${currentIndex + 1}: ${q.question}</h3>
    <ul class="options">
      ${q.options.map((opt, idx) => `
        <li>
          <button class="option-btn" onclick="checkAnswer(${idx})">${opt}</button>
        </li>
      `).join('')}
    </ul>
    <div class="nav-buttons">
      <button onclick="prevQuiz()" ${currentIndex === 0 ? 'disabled' : ''}>Previous</button>
      <button onclick="nextQuiz()">Next</button>
    </div>
  `;
  quizContainer.innerHTML = questionHtml;
  feedbackContainer.innerHTML = '';
}

function checkAnswer(selectedIdx) {
  const correct = quizQuestions[currentIndex].answer;
  if (selectedIdx === correct) {
    feedbackContainer.innerHTML = `<p class="correct">✅ Correct!</p>`;
  } else {
    feedbackContainer.innerHTML = `<p class="wrong">❌ Wrong. Correct: ${quizQuestions[currentIndex].options[correct]}</p>`;
  }
}

function nextQuiz() {
  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    displayQuizQuestion();
  }
}

function prevQuiz() {
  if (currentIndex > 0) {
    currentIndex--;
    displayQuizQuestion();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
