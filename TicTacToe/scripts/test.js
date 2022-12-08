const GameField = document.getElementsByClassName('cell');
let playerOneScore = document.getElementsByClassName('playerScore1');
let playerTwoScore = document.getElementsByClassName('playerScore2');
const ButtonRestart = document.getElementsByClassName('restart');
let winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6]
];


function checkWin(i, flag) {
    let a = winCombination.filter(n => n.includes(i));
    if (!flag)
        return a.some(n => n.every(x => GameField[x].innerHTML === 'X'));
    else
        return a.some(n => n.every(x => GameField[x].innerHTML === 'O'));
}


function main() {
    // Добавить ввод имен игроков и отображение их в html документе
    // Сделать счетчик побед игроков
    // Доработать кнопки

    let flag = true;  // X - false, O - true
    for (let i = 0; i < GameField.length; i++) {
        GameField[i].addEventListener('click', () => {
            if (flag && GameField[i].innerHTML != 'O') {
                GameField[i].innerHTML = 'X';
                flag = false;
            }
            else if (GameField[i].innerHTML != 'X') {
                GameField[i].innerHTML = 'O';
                flag = true;
            }

            if (checkWin(i, flag))
                if (flag) {
                    alert('win player 2');
                }
                else
                    alert('win player 1');
        });
    }
}


main();