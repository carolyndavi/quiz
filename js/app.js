('use strict');

// starting variables
let questionCounter = 0;
let questionIndex,
  questionText,
  choiceText,
  progressText,
  possibleChoices,
  choiceOptions,
  choice;

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
  progressText.innerText = `${questionCounter + 1} / ${questions.length}`;
  progressContainer.appendChild(progressText);
  questionCounter++;

  questionIndex = 0;

  showQuestions();
  showChoices();
}

// getting questions and choices from array
const showQuestions = () => {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question-container');
  quizContainer.appendChild(questionContainer);

  questionText = document.createElement('h2');
  questionText.classList.add('question-text');
  questionText.innerText = questions[questionIndex].question;
  questionContainer.appendChild(questionText);
};

// getting choices from array
const showChoices = () => {
  const choiceContainer = document.createElement('div');
  choiceContainer.classList.add('choice-container');
  quizContainer.appendChild(choiceContainer);

  for (let i = 1; i < questions.length; i++) {
    choice = document.createElement('div');
    choice.classList.add('choice', 'choice' + [i]);
    choiceContainer.appendChild(choice);

    const choiceNumber = document.createElement('div');
    choiceNumber.classList.add('choice-number') + [i];
    choiceNumber.innerText = i;
    choice.appendChild(choiceNumber);

    choiceText = document.createElement('div');
    choiceText.classList.add('choice-text');
    choiceText.innerText = questions[questionIndex].choices[i - 1];
    choice.appendChild(choiceText);
  }

  const choices = document.querySelectorAll('.choice-text');
  for (let j = 0; j < choices.length; j++) {
    choices[j].setAttribute('onclick', 'choiceSelected(this)');
  }
  console.log(choices);
};

// select choices
function choiceSelected(answer) {
  const userAnswer = answer.textContent;
  const correctAnswer = questions[questionIndex].answer;
  console.log(userAnswer, correctAnswer);
  if (userAnswer === correctAnswer) {
    answer.classList.add('correct');
    console.log('Answer is correct');
  } else {
    answer.classList.add('incorrect');
    console.log('Answer is wrong');
  }
}

// if next button is clicked
nextButton.addEventListener('click', nextQuestion);

function nextQuestion() {
  if (questionCounter < questions.length) {
    questionIndex++;
    questionCounter++;
    questionText.innerText = questions[questionIndex].question;
    progressText.innerText = `${questionCounter} / ${questions.length}`;

    possibleChoices = questions[questionIndex].choices;
    choiceOptions = document.querySelectorAll('.choice-text');

    for (let i = 0; i < possibleChoices.length; i++) {
      choiceOptions[i].innerText = possibleChoices[i];
    }

    if (questionCounter === questions.length) {
      nextButton.innerText = 'Finish';
    }
  } else {
    console.log('questions completed');
  }
}

// if previous button is clicked
previousButton.addEventListener('click', previousQuestion);

function previousQuestion() {
  if (questionCounter > questions.length - questions.length + 1) {
    questionIndex--;
    questionCounter--;

    questionText.innerText = questions[questionIndex].question;
    progressText.innerText = `${questionCounter} / ${questions.length}`;

    possibleChoices = questions[questionIndex].choices;
    choiceOptions = document.querySelectorAll('.choice-text');

    for (let i = possibleChoices.length - 1; i >= 0; i--) {
      choiceOptions[i].innerText = possibleChoices[i];
    }

    if (questionCounter === questions.length - 1) {
      nextButton.innerText = 'Next';
    }
  } else {
    console.log('start questions');
  }
}
