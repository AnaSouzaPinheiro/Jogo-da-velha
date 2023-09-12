const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let scoreO = 0;
let scoreX = 0;
let scoreVelha = 0;
let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();

  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Velha!";
    scoreVelha++; // Incrementa velha se for empate
    scoreUpdate();
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O VENCEU!"
      : "X VENCEU!";

    if (isCircleTurn) {
      scoreO++; // Incrementa o se o jogador O vencer
      scoreUpdate();
    } else {
      scoreX++; // Incrementa x se o jogador X vencer
      scoreUpdate();
    }
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const scoreUpdate = () => {
  document.querySelector("[data-score-o]").textContent = scoreO;
  document.querySelector("[data-score-x]").textContent = scoreX;
  document.querySelector("[data-score-velha]").textContent = scoreVelha;
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca
  const cell = e.target; // elemento da célula
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar se houve vitória
  const isWin = checkForWin(classToAdd);

  // Verificar se houve empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  }

  // Mudar símbolo
  else {
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
