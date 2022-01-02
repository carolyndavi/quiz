('use strict');
import questions from './questions.js';

// starting variables
let correctAnswers = 0;
let pageCounter = 0;
let currentQuestionIndex;

let progressText;
let questionText;
let optionText;
let possibleOptions;
let allOptionElements;

// creating and selecting elements
const container = document.querySelector('.container');

const startButton = document.createElement('button');
startButton.classList.add('start-button');
startButton.innerHTML = 'Start';
container.appendChild(startButton);

const quizContainer = document.createElement('div');
quizContainer.classList.add('quiz-container', 'hide-element');
container.appendChild(quizContainer);

const quizTitle = document.createElement('h1');
quizTitle.classList.add('quiz-title');
quizTitle.innerHTML = 'Math Problem';
quizContainer.appendChild(quizTitle);

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

// if start button is clicked
startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.classList.add('hide-element');
  quizContainer.classList.remove('hide-element');
  buttonContainer.classList.remove('hide-element');

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-container');
  quizContainer.appendChild(progressContainer);

  progressText = document.createElement('span');
  progressText.classList.add('progress-text');
  progressText.innerText = `${pageCounter + 1} / ${questions.length}`;
  progressContainer.appendChild(progressText);

  pageCounter++;
  currentQuestionIndex = 0;

  createQuestions();
  showChoices();
}

// create question function
function createQuestions() {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');
  quizContainer.appendChild(questionContainer);

  questionText = document.createElement('h2');
  questionText.classList.add('question-text');
  questionText.innerText = questions[currentQuestionIndex].question;
  questionContainer.appendChild(questionText);
}

// getting choices from array
function showChoices() {
  const optionContainer = document.createElement('div');
  optionContainer.classList.add('option-container');
  quizContainer.appendChild(optionContainer);

  for (let i = 1; i < questions.length; i++) {
    const optionList = document.createElement('div');
    optionList.classList.add('option-list');
    optionContainer.appendChild(optionList);

    const optionNumber = document.createElement('div');
    optionNumber.classList.add('option-number') + [i];
    optionNumber.innerText = i;
    optionList.appendChild(optionNumber);

    optionText = document.createElement('div');
    optionText.classList.add('option-text');
    optionText.innerText = questions[currentQuestionIndex].option[i - 1];
    optionList.appendChild(optionText);

    optionList.addEventListener('click', selectAnswer);
  }
}

//  select answer and check if answer is correct or incorrect
function selectAnswer(event) {
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
  if (pageCounter < questions.length) {
    currentQuestionIndex++;
    pageCounter++;

    questionText.innerText = questions[currentQuestionIndex].question;
    progressText.innerText = `${pageCounter} / ${questions.length}`;

    possibleOptions = questions[currentQuestionIndex].option;
    allOptionElements = document.querySelectorAll('.option-text');

    for (let i = 0; i < possibleOptions.length; i++) {
      allOptionElements[i].innerText = possibleOptions[i];
    }

    if (pageCounter === questions.length) {
      nextButton.innerText = 'Finish';
    }
  } else {
    restartQuiz();
  }
}

// if previous button is clicked
previousButton.addEventListener('click', previousQuestion);

function previousQuestion() {
  currentQuestionIndex--;
  pageCounter--;

  if (pageCounter > questions.length - questions.length + 1) {
    questionText.innerText = questions[currentQuestionIndex].question;
    progressText.innerText = `${pageCounter} / ${questions.length}`;

    possibleOptions = questions[currentQuestionIndex].option;
    allOptionElements = document.querySelectorAll('.option-text');

    for (let i = 0; i < possibleOptions.length; i++) {
      allOptionElements[i].innerText = possibleOptions[i];
    }

    if (pageCounter === questions.length) {
      nextButton.innerText = 'Next';
    }
  } else {
    console.log('start questions');
  }
}

// restart quiz
function restartQuiz() {
  quizContainer.classList.add('hide-element');
  buttonContainer.classList.add('hide-element');

  const totalScore = document.createElement('p');
  totalScore.classList.add('total-score');
  totalScore.innerText = `You've got ${correctAnswers} out of 6 questions right.`;
  container.appendChild(totalScore);

  const restartButtonContainer = document.createElement('div');
  restartButtonContainer.classList.add('button-container');
  container.appendChild(restartButtonContainer);

  const restartButton = document.createElement('div');
  restartButton.classList.add('restart-button');
  restartButton.innerText = 'Restart';
  restartButtonContainer.appendChild(restartButton);
}
