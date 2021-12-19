const stopwatch = document.querySelector('.stopwatch');
const startButton = document.querySelector('#play-btn');
const pauseButton = document.querySelector('#pause-btn');
const stopButton = document.querySelector('#stop-btn');

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timer;

function startTimer() {
  if (!timer) {
    timer = setInterval(runTimer, 10);
  }
}

function runTimer() {
  getTimer();
  milliseconds++;
  if (milliseconds == 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
}

function pauseTimer() {
  stopTimer();
}

function resetTimer() {
  stopTimer();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  getTimer();
}

function stopTimer() {
  clearInterval(timer);
  timer = false;
}

function getTimer() {
  return (stopwatch.textContent =
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds) +
    ':' +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds));
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', stopTimer);
stopButton.addEventListener('click', resetTimer);

feather.replace();
