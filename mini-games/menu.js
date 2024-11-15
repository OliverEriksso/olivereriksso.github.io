import { initializeRockPaperScissors } from './rock-paper-scissors/ro-pa-sci.js';
import { initializeEtchASketch } from './etch-a-sketch/etchASketch.js';
import { initializeTicTacToe } from './tic-tac-toe/ticTacToe.js';
import { initializeWordle } from './wordle/wordle.js';

const gameContent = document.getElementById("gameContent");
const closeButton = document.getElementById("closeButton");
const games = document.querySelectorAll(".game")
const overlay = document.getElementById("game-overlay");

const loadedScripts = new Set();

const gameContentData = {
    game1: {
        title: "Rock Paper Scissors",
        description: "Play Rock Paper Scissors versus the computer!",
        script: "./rock-paper-scissors/ro-pa-sci.js", 
        renderFunction: initializeRockPaperScissors
    },
    game2: {
        title: "Etch-a-Sketch",
        description: "Play Etch-a-Sketch!",
        script: "./etch-a-sketch/etchASketch.js", 
        renderFunction: initializeEtchASketch
    },
    game3: {
        title: "Tic Tac Toe",
        description: "Play some Tic Tac Toe!",
        script: "./tic-tac-toe/ticTacToe.js", 
        renderFunction: initializeTicTacToe
    },
    game4: {
        title: "Wordle",
        description: "Play Wordle infinitely!",
        script: "./wordle/wordle.js", 
        renderFunction: initializeWordle
    },
};

games.forEach(game => {
    game.addEventListener("click", function() {
        const gameId = this.getAttribute('data-game');
        const gameData = gameContentData[gameId];

        while (gameContent.firstChild) {
            gameContent.removeChild(gameContent.firstChild);
        }

        if (gameData) {
            const gameTitle = document.createElement("h2");
            gameTitle.textContent = gameData.title;
            const gameDescription = document.createElement("p");
            gameDescription.textContent = gameData.description;
            const contentContainer = document.createElement("div");
            contentContainer.id = gameId;

            gameContent.appendChild(gameTitle);
            gameContent.appendChild(gameDescription);
            gameContent.appendChild(contentContainer);

            if (gameData.script) {
                const getScript = document.createElement("script");
                getScript.type = "module";
                getScript.src = gameData.script;
                document.body.appendChild(getScript);
                loadedScripts.add(gameData.script);

                getScript.onload = function() {
                    if (gameData.renderFunction) {
                        gameData.renderFunction();
                    }
                };
            }
            overlay.style.display = "flex";
        }
    })
})

function closeGamePopup() {
    overlay.style.display = "none"; 

    while (gameContent.firstChild) {
        gameContent.removeChild(gameContent.firstChild); 
    }

    loadedScripts.forEach(scriptSrc => {
        const scriptElements = document.querySelectorAll(`script[src="${scriptSrc}"]`);
        scriptElements.forEach(scriptElement => {
            document.body.removeChild(scriptElement);   
        });
    });

    loadedScripts.clear();
}

closeButton.addEventListener("click", function() {
    closeGamePopup();
});

overlay.addEventListener("click", function(event) {
    if (!gameContent.contains(event.target)) {
        closeGamePopup();
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeGamePopup();
    }
})


