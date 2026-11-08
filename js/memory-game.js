
// Memory Game Variables

const symbols = ["🍎", "🚀", "🎮", "⚽", "🌟", "🐱"];

let cards = [];
let flippedCards = [];
let matchedPairs = new Set();
let moves = 0;
let gameStarted = false;
let gameOver = false;
let historyData = [];

// Get HTML Elements

const memoryBoard = document.getElementById("memoryBoard");
const pairsFound = document.getElementById("pairsFound");
const movesCount = document.getElementById("movesCount");
const memoryResult = document.getElementById("memoryResult");
const restartButton = document.getElementById("restartButton");
const memoryHistory = document.getElementById("memoryHistory");

const rulesButton = document.getElementById("rulesButton");
const rulesContent = document.getElementById("rulesContent");


// Show and Hide Rules

rulesButton.addEventListener("click", function () {

    rulesContent.hidden = !rulesContent.hidden;

    rulesButton.textContent = rulesContent.hidden
        ? "Show Game Rules"
        : "Hide Game Rules";

});


// Shuffle Cards

function shuffleCards(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        [array[i], array[randomIndex]] =
            [array[randomIndex], array[i]];

    }

    return array;
}


// Start New Game

function startGame() {

    cards = shuffleCards([...symbols, ...symbols]);

    flippedCards = [];
    matchedPairs = new Set();

    moves = 0;
    gameStarted = false;
    gameOver = false;

    pairsFound.textContent = "0";
    movesCount.textContent = "0";

    memoryResult.textContent = "Find your first pair!";

    restartButton.disabled = true;

    memoryBoard.innerHTML = "";

    cards.forEach(function (symbol, index) {

        const card = document.createElement("button");

        card.className = "memory-card";
        card.textContent = "❓";
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        card.addEventListener("click", function () {

            flipCard(card);

        });

        memoryBoard.appendChild(card);

    });

}


// Flip Card

function flipCard(card) {

    if (gameOver || card.disabled || flippedCards.length === 2) {
        return;
    }

    if (flippedCards.includes(card)) {
        return;
    }

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");

    flippedCards.push(card);

    if (flippedCards.length === 2) {

        moves++;

        movesCount.textContent = moves;

        checkMatch();

    }

}


// Check Matching Cards

function checkMatch() {

    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        firstCard.disabled = true;
        secondCard.disabled = true;

        matchedPairs.add(firstCard.dataset.symbol);

        pairsFound.textContent = matchedPairs.size;

        flippedCards = [];

        memoryResult.textContent = "Great! You found a matching pair.";

        if (matchedPairs.size === 6) {

            endGame();

        }

    } else {

        memoryResult.textContent = "Not a match! Try again.";

        setTimeout(function () {

            firstCard.textContent = "❓";
            secondCard.textContent = "❓";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            flippedCards = [];

        }, 1000);

    }

}


// End Game

function endGame() {

    gameOver = true;

    memoryResult.textContent =
        "🎉 YOU WON! All pairs found in " + moves + " moves.";

    restartButton.disabled = false;

    const completedGame = {
        result: "WON",
        moves: moves
    };

    historyData.push(completedGame);

    updateHistory();

}


// Update History

function updateHistory() {

    memoryHistory.innerHTML = "";

    historyData.forEach(function (game, index) {

        const li = document.createElement("li");

        li.textContent =
            "Game " + (index + 1) +
            " - " + game.result +
            " | Moves: " + game.moves;

        memoryHistory.appendChild(li);

    });

}


// Restart Button

restartButton.addEventListener("click", function () {

    startGame();

});


// Initialize Game

startGame();
