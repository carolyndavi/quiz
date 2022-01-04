('use strict');
import questions from './questions.js';

// starting variables
let correctAnswers = 0;
let pageCounter;
let quizQuestion;
let currentQuestionIndex = 0;

// creating and selecting elements
const container = document.querySelector('.container');

const startButton = document.createElement('button');
startButton.classList.add('start-button');
startButton.innerHTML = 'Start';
container.appendChild(startButton);

const quizContainer = document.createElement('div');
quizContainer.classList.add('quiz-container', 'hide-element');
container.appendChild(quizContainer);

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container', 'hide-element');
container.appendChild(buttonContainer);

const previousButton = document.createElement('button');
previousButton.classList.add('previous-button');
previousButton.innerHTML = 'Previous';
buttonContainer.appendChild(previousButton);

const nextButton = document.createElement('button');
nextButton.classList.add('next-button');
nextButton.innerHTML = 'Next';
buttonContainer.appendChild(nextButton);

// if start button is clicked start quiz
startButton.addEventListener('click', () => {
  startQuiz();
});

// start quiz function
const startQuiz = () => {
  startButton.classList.add('hide-element');
  quizContainer.classList.remove('hide-element');
  buttonContainer.classList.remove('hide-element');

  const quizTitle = document.createElement('h1');
  quizTitle.classList.add('quiz-title');
  quizTitle.innerHTML = 'Math Problem';
  quizContainer.appendChild(quizTitle);

  const pageCounterContainer = document.createElement('div');
  pageCounterContainer.classList.add('page-counter-container');
  quizContainer.appendChild(pageCounterContainer);

  pageCounter = document.createElement('span');
  pageCounter.classList.add('page-counter-text');
  pageCounter.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
  pageCounterContainer.appendChild(pageCounter);

  createQuestion();
};

// creating questions function
const createQuestion = () => {
  const quizContainer = document.querySelector('.quiz-container');

  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');
  quizContainer.appendChild(questionContainer);

  quizQuestion = document.createElement('h2');
  quizQuestion.classList.add('quiz-question');
  quizQuestion.innerText = questions[currentQuestionIndex].question;
  questionContainer.appendChild(quizQuestion);

  const optionContainer = document.createElement('div');
  optionContainer.classList.add('option-container');
  quizContainer.appendChild(optionContainer);

  for (let option of questions[currentQuestionIndex].option) {
    const options = document.createElement('div');
    options.classList.add('option');
    options.innerText = option;
    optionContainer.appendChild(options);
    options.addEventListener('click', getResults);
  }
};

//  select answer and check if answer is correct or incorrect
function getResults(event) {
  const userAnswer = event.target.innerText;
  const correctAnswer = questions[currentQuestionIndex].answer;
  console.log(userAnswer, correctAnswer);
  if (userAnswer === correctAnswer) {
    console.log('correct!');
    correctAnswers++;
    console.log(correctAnswers);
  } else {
    console.log('incorrect!');
  }
}

// if next button is clicked
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;

    pageCounter.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
    quizQuestion.innerText = questions[currentQuestionIndex].question;

    const possibleOptions = questions[currentQuestionIndex].option;
    const allOptionElements = document.querySelectorAll('.option');

    for (let i = 0; i < possibleOptions.length; i++) {
      allOptionElements[i].innerText = possibleOptions[i];
    }

    if (currentQuestionIndex === questions.length - 1) {
      nextButton.innerText = 'Finish';
    }
  } else {
    restartQuiz();
  }
}

// if previous button is clicked
previousButton.addEventListener('click', previousQuestion);

function previousQuestion() {
  if (currentQuestionIndex === 0) {
    return;
  }
  currentQuestionIndex--;
  pageCounter.innerText = `${currentQuestionIndex + 1} / 6`;
  quizQuestion.innerText = questions[currentQuestionIndex].question;

  const possibleOptions = questions[currentQuestionIndex].option;
  const allOptionElements = document.querySelectorAll('.option');

  for (let i = 0; i < possibleOptions.length; i++) {
    allOptionElements[i].innerText = possibleOptions[i];
  }

  if (currentQuestionIndex < questions.length) {
    nextButton.innerText = 'Next';
  }
}

// restart quiz
const restartQuiz = () => {
  quizContainer.classList.add('hide-element');
  buttonContainer.classList.add('hide-element');

  const results = document.createElement('p');
  results.classList.add('results');
  container.appendChild(results);

  const restartButtonContainer = document.createElement('div');
  restartButtonContainer.classList.add('button-container');
  container.appendChild(restartButtonContainer);

  const restartButton = document.createElement('div');
  restartButton.classList.add('restart-button');
  restartButton.innerText = 'Restart';
  restartButtonContainer.appendChild(restartButton);

  if (correctAnswers <= 3) {
    results.innerText = `BOOHOO! You answered ${correctAnswers} out of 6 questions right. Better luck next time!`;
  } else {
    results.innerText = `YAY! You answered ${correctAnswers} out of 6 questions right. Good Job!`;
  }

  restartButton.addEventListener('click', () => {
    restartButton.classList.add('hide-element');
    results.classList.add('hide-element');
    startButton.classList.remove('hide-element');
    startButton.addEventListener('click', () => {
      resetQuiz();
      startQuiz();
    });
  });
};

function resetQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  nextButton.innerText = 'Next';
  while (quizContainer.firstChild) {
    quizContainer.removeChild(quizContainer.firstChild);
  }
}
