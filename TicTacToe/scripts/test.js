// Получаем все ячейки (это NodeList, который можно перебирать)
const cells = document.querySelectorAll('.cell');
// Получаем кнопки
const buttonRestart = document.querySelector('.button.restart');
const buttonRestartGame = document.querySelector('.button.restartGame');

// Переменные для отслеживания состояния игры
let currentPlayer = 'X';
// Логическое состояние доски
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { 'X': 0, 'O': 0 };

// Обновляем отображение счета (на старте 0)
document.querySelector('.playerScore1').textContent = `Player one wins: ${scores['X']}`;
document.querySelector('.playerScore2').textContent = `Player two wins: ${scores['O']}`;

// Возможные выигрышные комбинации (индексы ячеек)
const winCombination = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
  [0, 4, 8], [2, 4, 6]             // Диагонали
];

// Функция проверки победы для указанного игрока
function checkWin(playerSymbol) {
  return winCombination.some(combination => {
    // Проверяем, совпадают ли символы во всех ячейках комбинации с символом игрока
    return combination.every(index => gameBoard[index] === playerSymbol);
  });
}

// Функция обработки клика по ячейке
function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

  // Проверяем, пуста ли ячейка и активна ли игра
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }

  // Обновляем состояние
  gameBoard[cellIndex] = currentPlayer;
  // Отображаем символ на доске
  clickedCell.textContent = currentPlayer;

  // Проверяем, выиграл ли текущий игрок
  if (checkWin(currentPlayer)) {
    if (currentPlayer === 'X') {
      scores['X']++;
    }
    else {
      scores['O']++;
    }
    // Обновляем отображение счета
    document.querySelector('.playerScore1').textContent = `Player one wins: ${scores['X']}`;
    document.querySelector('.playerScore2').textContent = `Player two wins: ${scores['O']}`;

    alert(`Player ${currentPlayer === 'X' ? 'one' : 'two'} wins!`);
    // Деактивируем игру
    gameActive = false;
    return;
  }

  // Проверяем на ничью (если доска заполнена и нет победителя)
  if (!gameBoard.includes('')) {
    alert('Draw!');
    // Деактивируем игру
    gameActive = false;
    return;
  }

  // Меняем игрока
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  }
  else {
    currentPlayer = 'X';
  }
}

// Функция перезапуска раунда (очистка доски, сохранение счета)
function restartRound() {
  gameBoard = ['', '', '', '', '', '', '', '', '']; // Очищаем логическую доску
  gameActive = true; // Активируем игру снова
  currentPlayer = 'X'; // Начинает X

  // Очищаем отображение ячеек
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Функция перезапуска всей игры (очистка доски и обнуление счета)
function restartGame() {
  scores = { 'X': 0, 'O': 0 }; // Обнуляем счет
  // Обновляем отображение счета
  document.querySelector('.playerScore1').textContent = `Player one wins: ${scores['X']}`;
  document.querySelector('.playerScore2').textContent = `Player two wins: ${scores['O']}`;
  // Затем перезапускаем раунд
  restartRound();
}

// Добавляем обработчики событий клика к каждой ячейке
cells.forEach((cell, index) => {
  // Добавляем data-index при необходимости, если не задан в HTML
  // cell.setAttribute('data-index', index);
  cell.addEventListener('click', handleCellClick);
});

// Добавляем обработчики клика к кнопкам
buttonRestart.addEventListener('click', restartRound);
buttonRestartGame.addEventListener('click', restartGame);