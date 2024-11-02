import { initializeRockPaperScissors } from './ro-pa-sci.js';
// import { initializeTicTacToe } from './ticTacToe.js';
// import { initializeEtchASketch } from './etchASketch.js';
// import { initializeWordle } from './wordle.js';

const gameContent = document.getElementById("gameContent");
const closeButton = document.getElementById("closeButton");
const games = document.querySelectorAll(".game")
const overlay = document.getElementById("game-overlay");

const loadedScripts = new Set();

const gameContentData = {
    game1: {
        title: "Rock Paper Scissors",
        description: "Play Rock Paper Scissors versus the computer!",
        script: "ro-pa-sci.js", 
        renderFunction: initializeRockPaperScissors
    },
    game2: {
        title: "Etch-a-Sketch",
        description: "Play Etch-a-Sketch!",
        script: "", //"etchASketch.js" 
        renderFunction: null 
    },
    game3: {
        title: "Game 3",
        description: "This is a brief description of Game 3.",
        script: "", 
        renderFunction: null
    },
    game4: {
        title: "Game 4",
        description: "This is a brief description of Game 4.",
        script: "", 
        renderFunction: null
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

closeButton.addEventListener('click', function() {
    overlay.style.display = 'none'; 

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
});



