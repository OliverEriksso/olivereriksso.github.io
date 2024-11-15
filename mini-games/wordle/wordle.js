const ROWS_AMOUNT = 6;
const CELLS_AMOUNT = 5;

const CORRECT_CHAR = 2;
const EXISTS_CHAR = 1;
const INVALID_CHAR = 0;

let currentRow = 0;
let wordleBoard;
let cells;

let words = [];
let winningWord;
let gameWon = false;



export async function initializeWordle() {
    winningWord = await getNewWord();

    cells = Array.from(document.querySelectorAll(".wordle-cell"));

    wordleBoard = document.createElement("div");
    wordleBoard.id = "game-board";
    gameContent.appendChild(wordleBoard);
    createBoard(wordleBoard);

    const firstCell = wordleBoard.querySelector(".wordle-row input");
    firstCell.focus();
}

async function getNewWord() {   
    try {
        const response = await fetch("./wordle/wordle.json");

        if (!response.ok) {
            throw new Error("response ain't working");
        }

        words = await response.json();
        const randomIndex = Math.floor(Math.random() * words.length);
        const newWord = words[randomIndex];

        console.log(newWord);
        return newWord.toUpperCase();
    } catch (error) {
        console.error("Error fetching new word:", error)
        throw error;
    };
} 

function createBoard(wordleBoard) { 
    for (let i = 0; i < ROWS_AMOUNT; i++) {
        const wordleRow = document.createElement("div");
        wordleRow.classList.add("wordle-row");

        for (let j = 0; j < CELLS_AMOUNT; j++) {
            const wordleCell = document.createElement("input");
            wordleCell.type = "text";
            wordleCell.classList.add("wordle-cell");
            wordleCell.maxLength = "1";

            addCellEventListeners(wordleCell, wordleRow);
            
            wordleRow.appendChild(wordleCell);
        }
        wordleBoard.appendChild(wordleRow);
    }
}

function addCellEventListeners(wordleCell, wordleRow) {
    const updateUserInput = () => {
        const userInput = Array.from(wordleRow.querySelectorAll(".wordle-cell"))
            .map(cell => cell.value)
            .join("");
        return userInput;
    }

    wordleCell.addEventListener("input", (event) => {
        if (event.inputType !== "deleteContentBackward") {
            handleInput(wordleCell);
        }
        updateUserInput();
    });
    
    wordleCell.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            const pastCell = wordleCell.previousElementSibling;
            if (wordleCell.value === "" && pastCell) {
                pastCell.focus();
            }
            updateUserInput();
        }
        if (event.key === "Enter") {
            const userInput = updateUserInput();
            if (userInput.length === CELLS_AMOUNT) {

                if (!words.includes(userInput.toLowerCase())) {
                    alert("Word not found in the list!");
                    return;
                }

                let currentCell = wordleBoard.children[currentRow].querySelectorAll(".wordle-cell");
                let scoreArray = checkUserInput(userInput);

                //updateCellStyles(scoreArray, currentCell); //THIS IS ALSO FROM JS-STYLING.JS, KEEPING THE STYLING AND GAME SEPARATE
                //updateKeyboardColors(userInput, scoreArray); //THIS IS FROM VISUAL-KEYBOARD.JS TO DO WHAT IT SAYS TRUST

                checkForWin(scoreArray); //CHECK FOR WIN FIRST BEFORE MOVING ON TO NEXT ROW WITH THE UPDATED USERINPUT

                moveToNextRow(currentCell); //IF NO WIN, MOVE TO NEXT ROW & ALSO THIS DICTATES IF YOU LOSE
            }
        }
    })
}
function handleInput(wordleCell) {
    wordleCell.value = wordleCell.value.toUpperCase();
    const nextCell = wordleCell.nextElementSibling;
    if (nextCell) {
        nextCell.focus(); 
    }
    //animateInput(wordleCell); //FROM JS-STYLING.JS
}
function checkUserInput(userInput) {
    if (!userInput || userInput.length === 0) {
        return []; //RETURN EMPTY ARRAY TO AVOID ERROR
    }

    let scoreLookup = Array.from({length: userInput.length}, () => INVALID_CHAR);
    for (let i = 0; i < userInput.length; i++) {
        //scoreLookup[i] = INVALID_CHAR;
        if (userInput[i] === winningWord[i]) {
            scoreLookup[i] = CORRECT_CHAR;
            continue;
        }
        for (let j = 0; j < winningWord.length; j++) {
            if (userInput[i] === winningWord[j]) {
                scoreLookup[i] = EXISTS_CHAR;
                break;
            } 
        }
    }
    console.log(scoreLookup);
    return scoreLookup;
}

function moveToNextRow(currentCell) {
    //flipCells(currentCell); //FLIP CELLS ANIMATION FROM JS-STYLING.JS & STYLE.CSS
    
    setTimeout(() => { //WAIT FOR FLIP CELLS TO FINISH, THEN EXECUTE
        disableCurrentRow();

        currentRow++;

        if (currentRow < ROWS_AMOUNT) {
            const nextRow = wordleBoard.children[currentRow];
            const nextCell = nextRow ? nextRow.querySelector(".wordle-cell") : null;
            if (nextCell) {
                nextCell.focus(); 
            }
        }
        
        if (currentRow === ROWS_AMOUNT) {
            if (!gameWon) {
                hasLost();
            }
        }
    }, CELLS_AMOUNT * 200); // DELAY TO FLIP EACH CELL
}
function disableCurrentRow() {
    let rowCells = wordleBoard.children[currentRow].querySelectorAll(".wordle-cell");
    rowCells.forEach(cell => {
        cell.disabled = true;
    })
}

function checkForWin(scoreArray) {
    let didWin = scoreArray.every(score => score === CORRECT_CHAR);
    if (didWin) {
        didWin = true;
        gameWon = true; 
        setTimeout(() => hasWon(), 500); //DELAY SO TEXT CAN CHANGE TO GREEN BEFORE ALERT FROM HASWON
    }
}

function hasWon() {
    console.log("Congratulations, you WIN!");
    disableBoard();
}

function hasLost() {
    console.log(`Congratulations, for a LOSER! Word: ${winningWord} `);
    disableBoard();
}


function disableBoard() {
    const cells = document.querySelectorAll(".wordle-cell");
    cells.forEach(cell => {
        cell.disabled = true;
    });
}
