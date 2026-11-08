
// Generate a random number between 1 and 100

let secretNumber = Math.floor(Math.random() * 100) + 1;

// Game variables

let attempts = 7;
let gameOver = false;
let history = [];

// Get HTML elements

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const attemptsRemaining = document.getElementById("attemptsRemaining");
const message = document.getElementById("message");
const guessHistory = document.getElementById("guessHistory");
const restartButton = document.getElementById("restartButton");

const rulesButton = document.getElementById("rulesButton");
const rulesContent = document.getElementById("rulesContent");


// Show and hide rules

rulesButton.addEventListener("click", function() {

    rulesContent.hidden = !rulesContent.hidden;

    if (rulesContent.hidden) {
        rulesButton.textContent = "Show Game Rules";
    } else {
        rulesButton.textContent = "Hide Game Rules";
    }

});


// Handle guess button

guessButton.addEventListener("click", function() {

    // Check whether game is over

    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    // Validate input

    if (guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 || guess > 100) {

        message.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    // Prevent duplicate guesses

    if (history.includes(guess)) {
        message.textContent = "You already guessed this number. Try another!";
        return;
    }

    // Reduce attempts

    attempts--;

    attemptsRemaining.textContent = attempts;

    // Add guess to history

    history.push(guess);

    updateHistory();

    // Check answer

    if (guess === secretNumber) {

        message.textContent = "🎉 Congratulations! You guessed correctly!";
        message.style.color = "#66e6a1";

        endGame();

    } else if (attempts === 0) {

        message.textContent = "Game Over! The correct number was " + secretNumber;
        message.style.color = "#ff7777";

        endGame();

    } else if (guess < secretNumber) {

        message.textContent = "Too Low! Try a higher number.";
        message.style.color = "#8585ff";

    } else {

        message.textContent = "Too High! Try a lower number.";
        message.style.color = "#8585ff";

    }

    guessInput.value = "";

});


// Display guess history

function updateHistory() {

    guessHistory.innerHTML = "";

    history.forEach(function(guess, index) {

        const listItem = document.createElement("li");

        listItem.textContent = "Attempt " + (index + 1) + ": " + guess;

        guessHistory.appendChild(listItem);

    });

}


// End the game

function endGame() {

    gameOver = true;

    guessButton.disabled = true;
    guessInput.disabled = true;
    restartButton.disabled = false;

}


// Restart the game

restartButton.addEventListener("click", function() {

    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 7;
    gameOver = false;
    history = [];

    attemptsRemaining.textContent = attempts;

    message.textContent = "New game started! Start guessing.";
    message.style.color = "#8585ff";

    guessHistory.innerHTML = "<li>No guesses yet.</li>";

    guessInput.value = "";
    guessInput.disabled = false;

    guessButton.disabled = false;
    restartButton.disabled = true;

});
