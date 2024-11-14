let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let playerTurn;

const BOARD_SIZE = 3;
const cells = document.querySelectorAll(".tic-cell");
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
];

export function initializeTicTacToe() {
    const gameBoard = document.createElement("div");
    gameBoard.classList.add("tic-board")

    const resetBtn = document.createElement("button");
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener("click", restart)

    playerTurn = document.createElement("p");

    gameContent.appendChild(gameBoard);
    gameContent.appendChild(resetBtn);
    gameContent.appendChild(playerTurn);

    createBoard(gameBoard, BOARD_SIZE);
    turn = "X";
    playerTurn.textContent = `Player Turn: ${turn}`;
}

function createBoard(gameBoard, size) {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("tic-cell");
        cell.addEventListener("click", clickGameSquare);
        gameBoard.appendChild(cell);
    }
}

function clickGameSquare(clicked) {
    const cells = document.querySelectorAll(".tic-cell")

    const cell = clicked.target
    if (cell.textContent !== "") return;

    cell.textContent = turn;
    const index = Array.from(cells).indexOf(cell);
    board[index] = turn;

    if (checkWin(turn)) {
        playerTurn.textContent = `${turn} wins!`;
        disableBoard();
        return;
    }

    if (isBoardFull()) {
        playerTurn.textContent = "Draw! Noob";
        disableBoard();
        return;
    };
    turn = turn === "X" ? turn = "O" : turn= "X";
    
    playerTurn.textContent = `Player Turn: ${turn}`;
}

function checkWin(player) {
    for (let i = 0; i < winCombinations.length; i++) {
        const combination = winCombinations[i];
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}
function isBoardFull() {
    return !board.includes("");
}

function disableBoard() {
    const cells = document.querySelectorAll(".tic-cell")
    cells.forEach(cell => cell.removeEventListener("click", clickGameSquare));  
}

function restart() {
    turn ="X";
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn.textContent = `Player Turn: ${turn}`;
    const cells = document.querySelectorAll(".tic-cell")
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", clickGameSquare)
    })

}