console.log('main loaded')

const dicepoints = [
    //rondjes voor op de dobbelsteen
    '&#9856',
    '&#9857',
    '&#9858',
    '&#9859',
    '&#9860',
    '&#9861'
];


// html gelinkt met de javascript

const computerCreditsHTML = document.querySelector('.computer-credits');
const playerCreditsHTML = document.querySelector('.player-credits');
const computerDiceOne = document.querySelector('.computer-dice-one');
const computerDiceTwo = document.querySelector('.computer-dice-two');
const playerDiceOne = document.querySelector('.player-dice-one');
const playerDiceTwo = document.querySelector('.player-dice-two');
const messageBox = document.querySelector('.message-box');
const diceButton = document.querySelector('.dice-button');
const higherButton = document.querySelector('.higher-button');
const lowerButton = document.querySelector('.lower-button');
const goButton = document.querySelector('.go-button');

//variabelen voor de dicepoints
let randomNumberP1;
let randomNumberP2;
let randomNumberC1;
let randomNumberC2;
let totalComputer;
let totalPlayer;
let higher;
let gameOver = false;
let turnComputer = true;
let playerCredits = 0;
let computerCredits = 0;
lowerButton.disabled = true; // om te laten zien dat je eerst op de go button moet drukken. En dat deze knop erna gebruikt moet worden.
higherButton.disabled = true; // om te laten zien dat je eerst op de go button moet drukken. En dat deze knop erna gebruikt moet worden.
diceButton.disabled = true;  // om te laten zien dat je eerst op de go button moet drukken. En dat deze knop erna gebruikt moet worden.


diceButton.addEventListener('click', function () {//luisterd naar dat je de button clicked
    if (turnComputer) { // hieronder laat die zien wat er moet gebeuren als de computer aan de beurt is/
        randomNumberC1 = Math.floor(Math.random() * 6); //genereerd een random op de dobbelsteen voor de computer
        randomNumberC2 = Math.floor(Math.random() * 6);
        totalComputer = randomNumberC1 + randomNumberC2;
        computerDiceOne.innerHTML = `${dicepoints[randomNumberC1]}` // dit zet de punten neer bij de eerste dobbelsteen van de computer
        computerDiceTwo.innerHTML = `${dicepoints[randomNumberC2]}`
        lowerButton.disabled = false;  // als je gooi klikt dan gaan deze aan.
        higherButton.disabled = false;
        diceButton.disabled = true;
        goButton.disabled = true;
        turnComputer = false;
        //console.log(turnComputer);
    } else {
        randomNumberP1 = Math.floor(Math.random() * 6); //genereerd een random op de dobbelsteen voor de speler en math floor rond het af op een heel getal.
        randomNumberP2 = Math.floor(Math.random() * 6);
        totalPlayer = randomNumberP1 + randomNumberP2;
        playerDiceOne.innerHTML = `${dicepoints[randomNumberP1]}` // dit zet de punten neer die gegeneerd met mathfloor bij de eerste dobbelsteen
        playerDiceTwo.innerHTML = `${dicepoints[randomNumberP2]}`
        if (higher && totalComputer > totalPlayer) {   
            computerCredits++; 
            messageBox.textContent = 'De computer heeft deze ronde gewonnen'
            //  Bij && moeten de beweringen van links en rechts waar zijn om een credit te krijgen
        } else if (higher && totalPlayer > totalComputer) { // als de totalplayer hoger is dan computer is de playerscore +1
            playerCredits++;
            messageBox.textContent = 'De player heeft deze ronde gewonnen'
        } else if (!higher && totalPlayer > totalComputer) { // als het niet waar is dat de player hoger heeft. Dus dan krijgt de computer een punt. ! staat voor niet waar
            computerCredits++;
            messageBox.textContent = 'De computer heeft deze ronde gewonnen'
        } else if (!higher && totalComputer > totalPlayer) { // is het zelfde als de vorige maar dan andersom.
            playerCredits++;
            messageBox.textContent = 'De player heeft deze ronde gewonnen'
        } else if (totalPlayer == totalComputer) { // als de score hetzelfde zijn dat krijgen ze geen punten erbij(niemand wint).
            messageBox.textContent = 'De ronde heeft geen winnaar'
        }  // dus als higher en totalcomputer dan totalplayer dan krijg de computer een credit.
        computerCreditsHTML.textContent = computerCredits;
        playerCreditsHTML.textContent = playerCredits;
        lowerButton.disabled = false;
        higherButton.disabled = false;
        diceButton.disabled = true;
        turnComputer = true;
    }
    if (playerCredits == 3) { // als de speler hier 3 credits haalt dan laat die alleen de go button aan, om de game opnieuw te starten
        higherButton.disabled = true;
        lowerButton.disabled = true;
        diceButton.disabled = true;
        goButton.disabled = false;
        computerCredits = 0;
        playerCredits = 0;
        messageBox.textContent = 'De player heeft het spel gewonnen'
    }

    if (computerCredits == 3) { 
        higherButton.disabled = true;
        lowerButton.disabled = true;
        diceButton.disabled = true;
        goButton.disabled = false;
        computerCredits = 0;
        playerCredits = 0;
        messageBox.textContent = 'Computer heeft gewonnen'
    }

});



higherButton.addEventListener('click', function () { // hier laat ik die buttons werken met en click en wat er uit moet gaan als er op die button
    higher = true;
    lowerButton.disabled = true;
    higherButton.disabled = true;
    diceButton.disabled = false;
    goButton.disabled = true;
});
lowerButton.addEventListener('click', function () { // hier laat ik de lowerbutton werken en zeg je welke knoppen uit moeten gaan of aan
    higher = false;
    lowerButton.disabled = true;
    higherButton.disabled = true    ;
    diceButton.disabled = false;
    goButton.disabled = true;
});


goButton.addEventListener('click', function () { // hier laat ik zien wat er moet gebeuren als die button wordt geclicked
    diceButton.disabled = false; 
    goButton.disabled = false;
});





