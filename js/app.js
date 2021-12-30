'use strict';

const questions = [
  {
    question: 'What is 49 - 32?',
    choices: ['13', '17', '-17', '16', '697'],
    correctAnswer: '17',
  },
  {
    question: 'What is 70 - 14?',
    choices: ['18', '79', '56', '32', '34'],
    correctAnswer: '56',
  },
  {
    question: 'What is 80 - 15?',
    choices: ['74', '65', '93', '40', '975'],
    correctAnswer: '65',
  },
  {
    question: 'What is 10 - 20?',
    choices: ['-350', '-15', '-10', '-34', '-20'],
    correctAnswer: '-10',
  },
  {
    question: 'What is 56 + 11?',
    choices: ['102', '37', '44', '67', '50'],
    correctAnswer: '67',
  },
  {
    question: 'What is 21 - 16?',
    choices: ['170', '18', '5', '2', '26'],
    correctAnswer: '5',
  },
];

let currentQuestionIndex = 0;
let progressCounter = 0;
let questionText;
let choiceText;
let progressText;

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

// if startButton is clicked
startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.classList.add('hide-element');
  quizContainer.classList.remove('hide-element');
  buttonContainer.classList.remove('hide-element');

  const progressContainer = document.createElement('div');
  progressContainer.classList.add('progress-container');
  quizContainer.appendChild(progressContainer);

  const progressItem = document.createElement('div');
  progressItem.classList.add('progress-item');
  progressContainer.appendChild(progressItem);

  progressText = document.createElement('h3');
  progressText.classList.add('progress-text');
  progressText.innerText = `${progressCounter + 1} / ${questions.length}`;
  progressItem.appendChild(progressText);
  progressCounter++;

  currentQuestionIndex = 0;

  createQuestions();
  createChoices();
}

// createQuestions function
const createQuestions = () => {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');
  questionContainer.setAttribute('id', 'question');
  quizContainer.appendChild(questionContainer);

  questionText = document.createElement('h2');
  questionText.classList.add('question-text');
  questionText.innerText = questions[currentQuestionIndex].question;
  questionContainer.appendChild(questionText);
};

// createChoices function
const createChoices = () => {
  for (let i = 1; i < questions.length; i++) {
    const choiceContainer = document.createElement('div');
    choiceContainer.classList.add('choice-container');
    quizContainer.appendChild(choiceContainer);

    const choicePrefix = document.createElement('p');
    choicePrefix.classList.add('choice-prefix') + [i];
    choicePrefix.innerText = i;
    choiceContainer.appendChild(choicePrefix);

    choiceText = document.createElement('p');
    choiceText.classList.add('choice-text');
    choiceText.innerText = questions[currentQuestionIndex].choices[i - 1];
    choiceContainer.appendChild(choiceText);
  }
};

// nextQuestion function
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {
  currentQuestionIndex++;
  progressCounter++;
  questionText.innerText = questions[currentQuestionIndex].question;
  progressText.innerText = `${progressCounter} / ${questions.length}`;

  for (let i = 0; i < questions.length; i++) {
    choiceText.innerText = questions[currentQuestionIndex].choices[i - 1];
  }
}

// previousQuestion function
previousButton.addEventListener('click', previousQuestion);

function previousQuestion() {
  currentQuestionIndex--;
  progressCounter--;
  questionText.innerText = questions[currentQuestionIndex].question;
  progressText.innerText = `${progressCounter} / ${questions.length}`;
}
