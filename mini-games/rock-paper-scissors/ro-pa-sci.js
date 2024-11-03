let humanScore = 0;
let computerScore = 0;

export function initializeRockPaperScissors() {
    humanScore = 0;
    computerScore = 0;

    const totalScore = createElement("totalScore");
    const roundWinner = createElement("roundWinner"); 

    updateScore(totalScore);
    createBoard(roundWinner, totalScore);
}

function createElement(text) {
    const scoreElement = document.createElement("div"); 
    scoreElement.id = text; 
    document.getElementById("gameContent").appendChild(scoreElement); 
    return scoreElement; 
}

function getComputerChoice() {
    const i = Math.floor(Math.random() * 3);
    return i === 0 ? "rock" : i === 1 ? "paper" : "scissors"; 
}

function playRound(humanChoice = 0, computerChoice = 0) {
    //console.log(`Human chose: ${humanChoice}`);
    //console.log(`Computer chose: ${computerChoice}`);
    if (humanChoice === computerChoice) {
        //console.log("It's a tie!");
        roundWinner.textContent = `It's a tie!`
    } 
    else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        //console.log(`You win this round! ${humanChoice} beats ${computerChoice}`);
        roundWinner.textContent = `You win this round! ${humanChoice} beats ${computerChoice}`
        humanScore++
    } else { 
        //console.log(`You lose this round! ${computerChoice} beats ${humanChoice}`);
        roundWinner.textContent = `You lose this round! ${computerChoice} beats ${humanChoice}`

        computerScore++
    }
}

function updateScore() {
    totalScore.textContent = `Score: Human ${humanScore} - Computer ${computerScore}`;
}

function createBoard() {
    const rock = createImageElement("rock.png", "img of rock");
    const paper = createImageElement("paper.png", "img of paper");
    const scissors = createImageElement("scissors.png", "img of scissors");

    const board = document.getElementById("gameContent");

    rock.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        playGameAnimation(() => playRound('rock', computerChoice));
    });
    paper.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        playGameAnimation(() => playRound('paper', computerChoice));
    });
    scissors.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        playGameAnimation(() => playRound('scissors', computerChoice));
    });

    board.appendChild(rock);
    board.appendChild(paper);
    board.appendChild(scissors);
}

function createImageElement(imageSrc, altText) {
    const img = document.createElement('img'); 
    img.src = `./rock-paper-scissors/${imageSrc}`; 
    img.alt = altText; 
    img.className = 'rock-paper-scissor-image'; 
    return img; 
}

function playGameAnimation(callback) {
    // Hide all choices initially
    const choices = document.querySelectorAll('.rock-paper-scissor-image');
    choices.forEach(choice => choice.style.display = 'none');

    const shakeImage1 = createImageElement('rock.png', 'First Rock Image');
    const shakeImage2 = createImageElement('rock.png', 'Second Rock Image');

    shakeImage1.classList.add("shake-animation");
    shakeImage2.classList.add("shake-animation");

    const gameContent = document.getElementById("gameContent");
    gameContent.appendChild(shakeImage1);
    gameContent.appendChild(shakeImage2);

    setTimeout(() => {
        gameContent.removeChild(shakeImage1);
        gameContent.removeChild(shakeImage2);

        callback();
        updateScore();

        choices.forEach(choice => choice.style.display = 'inline-block');
    }, 1000); //KEEP SAME DURATION AS THE SHAKE ANIMATION IN CSS
}