let isDrawing = false;

export function initializeEtchASketch() {
    const sketchArea = document.createElement('div');
    const resetBtn = document.createElement('button');

    sketchArea.classList.add('etch-container');
    resetBtn.textContent = 'Reset';
    resetBtn.classList.add('reset-button');

    const gameContent = document.getElementById('gameContent');
    gameContent.appendChild(sketchArea);
    gameContent.appendChild(resetBtn);

    createGrid(sketchArea, 64);


    sketchArea.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    resetBtn.addEventListener('click', () => {
        const cells = sketchArea.querySelectorAll('.etch-cell');
        cells.forEach(cell => cell.style.backgroundColor = 'white');
    });
}


function createGrid(sketchArea, size) {
    clearGrid(sketchArea); 

    sketchArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('etch-cell'); 

        cell.addEventListener('mouseover', () => {
            if (isDrawing) {
                cell.style.backgroundColor = 'black'; 
            }
        });
        sketchArea.appendChild(cell);
    }
}

function clearGrid(sketchArea) {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}
