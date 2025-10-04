const GameField = document.querySelectorAll(".column");

let gameFieldSize = 4;
let gameField = [];

function createGameField() {
    for (let i = 0; i < gameFieldSize * gameFieldSize - 1; ++i)
        gameField.push(i + 1);
    gameField.push(-1);
}

function shuffleTiles(repeat) {
    for (let i = 0; i < repeat; ++i) {
        swapTiles(
            Math.trunc(Math.random() * gameField.length),
            Math.trunc(Math.random() * gameField.length)
        )
    }
}

function fillGameField() {
    let j = 0;
    for (tile of GameField) {
        if (gameField[j] === -1) {
            tile.innerHTML = "";
            j++;
        } else {
            tile.innerHTML = gameField[j++];
        }
    }
}

function chechWin() {
    for (let i = 0; i < gameField.length - 1; ++i)
        if (gameField[i] !== i + 1)
            return false;
    if (gameField[gameField.length - 1] !== -1)
        return false;
    return true;
}

function findEmptyTileID() {
    return gameField.indexOf(-1);
}

function swapTiles(tile1, tile2) {
    let tmp = gameField[tile1];
    gameField[tile1] = gameField[tile2];
    gameField[tile2] = tmp;
}

// Check if empty tile is neighbor of current tile (tileID)
function checkNeighborAndSwap(tileID) {
    let emptyTileID = findEmptyTileID();
    let row = tileID % gameFieldSize;
    let col = Math.trunc(tileID / gameFieldSize);

    // check left neighbor
    if (col * gameFieldSize + (row - 1) === emptyTileID)
        swapTiles(tileID, emptyTileID);
    // check right neighbor
    else if (col * gameFieldSize + (row + 1) === emptyTileID)
        swapTiles(tileID, emptyTileID);
    // check up neighbor
    else if ((col - 1) * gameFieldSize + row === emptyTileID)
        swapTiles(tileID, emptyTileID);
    // check dow neighbor
    else if ((col + 1) * gameFieldSize + row === emptyTileID)
        swapTiles(tileID, emptyTileID);
}

function handleClick(event) {
    let curTileID = event.target.getAttribute("id");
    checkNeighborAndSwap(curTileID);
    fillGameField();
    if (chechWin())
        alert("WIN");
}

function main() {
    createGameField();
    shuffleTiles(3);
    for (let i = 0; i < GameField.length; ++i)
        GameField[i].addEventListener("click", handleClick);
    fillGameField();
}

main();