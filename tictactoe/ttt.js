console.log('main loaded')

const gridItems = document.querySelectorAll('.grid-item');
const statusText = document.querySelector('.game-status');
const restartBtn = document.querySelector('.restartbutton');
const player1NameDisplay = document.getElementById('player1Name');
const player2NameDisplay = document.getElementById('player2Name');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const rulesBtn = document.querySelector('.button1');

const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];
rulesBtn.addEventListener('click', function showRules() {
    alert('Spelregels van Tic Tac Toe:\n\n1. Het spel wordt gespeeld op een 3x3 rooster.\n2. Twee spelers nemen om de beurt een vakje in het rooster in.\n3. De speler die drie van zijn/haar symbolen (X of O) op een rij heeft, wint het spel.\n4. Als het rooster vol is zonder winnaar, eindigt het in een gelijkspel.\n5. Druk op de "Restart Choice / Restart keuze" als je een fout hebt gemaakt in het klikken.');
});

const options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameActive = false;

let player1Name = 'Speler 1';
let player2Name = 'Speler 2';
let player1Score = 0;
let player2Score = 0;

function initializeGame() {
    player1Name = prompt('Voer de naam in voor Speler 1:', 'Speler 1'); 
    player2Name = prompt('Voer de naam in voor Speler 2:', 'Speler 2');
    player1NameDisplay.textContent = player1Name;
    player2NameDisplay.textContent = player2Name;

    gridItems.forEach(gridItem => gridItem.addEventListener('click', gridClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${player1Name}'s beurt`;
    gameActive = true;
}

function gridClicked() {
    const gridIndex = parseInt(this.getAttribute('cellindex')) - 1;

    if (options[gridIndex] !== "" || !gameActive) return;

    updateGrid(this, gridIndex);
    checkWinner();
}

function updateGrid(grid, index) {
    options[index] = currentPlayer;
    grid.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s beurt`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const gridA = options[condition[0] - 1];
        const gridB = options[condition[1] - 1];
        const gridC = options[condition[2] - 1];

        if (gridA === '' || gridB === '' || gridC === '') {
            continue;
        }
        if (gridA === gridB && gridB === gridC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            player1Score++;
            player1ScoreDisplay.textContent = player1Score;
            statusText.textContent = `${player1Name} wint!`;
        } else {
            player2Score++;
            player2ScoreDisplay.textContent = player2Score;
            statusText.textContent = `${player2Name} wint!`;
        }

        if (player1Score === 5) {
            statusText.textContent = `${player1Name} heeft 5 punten behaald en wint het spel!`;
            setTimeout(resetGame, 1000);  // Wacht 1 seconden en reset de game
        } else if (player2Score === 5) {
            statusText.textContent = `${player2Name} heeft 5 punten behaald en wint het spel!`;
            setTimeout(resetGame, 1000);  // Wacht 1 seconden en reset de game
        } else {
            gameActive = false;
            setTimeout(restartGame, 1000);  // Herstart de game na 2 seconden
        }
    } else if (!options.includes('')) {
        statusText.textContent = `Gelijkspel!`;
        gameActive = false;
        setTimeout(restartGame, 1000);  // Voeg de herstartfunctie hier toe bij gelijkspel
    } else {
        changePlayer();
    }
}

function restartGame() {
    options.fill("");  // Maak de spelopties opnieuw leeg
    gridItems.forEach(grid => grid.textContent = '');  // Leeg de grid
    statusText.textContent = `${player1Name}'s beurt`;
    currentPlayer = 'X';
    gameActive = true;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
    options.fill("");  // Maak de grid opnieuw leeg
    gridItems.forEach(grid => grid.textContent = '');  // Leeg de grid
    statusText.textContent = `${player1Name}'s beurt`;
    currentPlayer = 'X';
    gameActive = true;
    setTimeout(initializeGame, 2000);  // Start een nieuw spel na 2 seconden
}

initializeGame();
