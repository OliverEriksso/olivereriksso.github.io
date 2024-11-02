let humanScore = 0;
let computerScore = 0;

export function initializeRockPaperScissors() {
    humanScore = 0;
    computerScore = 0;
    const totalScore = createScoreElement();
    updateScore(totalScore);
    getComputerChoice();
    createBoard();
}
function createScoreElement() {
    const scoreElement = document.createElement("div"); // Changed from "score" to "div"
    scoreElement.id = "totalScore"; // Give it an ID for easy styling if needed
    document.getElementById("gameContent").appendChild(scoreElement); // Append it to the game content
    return scoreElement; // Return the score element
}

function getComputerChoice() {
    const i = Math.floor(Math.random() * 3);
    return i === 0 ? "rock" : i === 1 ? "paper" : "scissors"; 
}

function playRound(humanChoice = 0, computerChoice = 0) {
    console.log(`Human chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
    } 
    else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        console.log(`You win this round! ${humanChoice} beats ${computerChoice}`);
        humanScore++
    } else { 
        console.log(`You lose this round! ${computerChoice} beats ${humanChoice}`);
        computerScore++
    }
    updateScore();
}

function updateScore() {
    totalScore.textContent = `Score: Human ${humanScore} - Computer ${computerScore}`;
}

function createBoard() {
    const rock = createImageElement("rock.webp", "img of rock");
    const paper = createImageElement("hand.webp", "img of hand");
    const scissors = createImageElement("scissors.webp", "img of scissors");

    const board = document.getElementById("gameContent");

    rock.addEventListener('click', () => playRound('rock', getComputerChoice()));
    paper.addEventListener('click', () => playRound('paper', getComputerChoice()));
    scissors.addEventListener('click', () => playRound('scissors', getComputerChoice()));

    board.appendChild(rock);
    board.appendChild(paper);
    board.appendChild(scissors);
}

function createImageElement(imageSrc, altText) {
    const img = document.createElement('img'); 
    img.src = imageSrc; 
    img.alt = altText; 
    img.className = 'rock-paper-scissor-image'; 
    return img; 
}