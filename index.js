const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let scoreBoard = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add('snake'));

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  scoreBoard = 0;
  score.textContent = scoreBoard;
  direction = 1;
  intervalTime = 1000;
  generateApples();
  currentSnake.forEach((index) => squares[index].classList.add('snake'));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId);
  const tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  const head = currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    generateApples();
    scoreBoard++;
    score.textContent = scoreBoard;
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add('snake');
}
move();

function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

generateApples();

document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
