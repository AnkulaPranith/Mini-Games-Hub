
// Game variables

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

const choices = ["Rock", "Paper", "Scissors"];

// Store completed match results

let matchHistoryData = [];

// Get HTML elements

const choiceButtons = document.querySelectorAll(".choice-btn");

const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");

const playerPick = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");

const playerPickName = document.getElementById("playerPickName");
const computerPickName = document.getElementById("computerPickName");

const roundResult = document.getElementById("roundResult");
const matchHistory = document.getElementById("matchHistory");
const restartButton = document.getElementById("restartButton");

const rulesButton = document.getElementById("rulesButton");
const rulesContent = document.getElementById("rulesContent");


// Convert choice into emoji

function getEmoji(choice) {

    if (choice === "Rock") {
        return "✊";
    }

    if (choice === "Paper") {
        return "✋";
    }

    if (choice === "Scissors") {
        return "✌️";
    }

}


// Show and hide rules

rulesButton.addEventListener("click", function() {

    rulesContent.hidden = !rulesContent.hidden;

    rulesButton.textContent = rulesContent.hidden
        ? "Show Game Rules"
        : "Hide Game Rules";

});


// Player choice buttons

choiceButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (gameOver) {
            return;
        }

        const playerChoice = button.dataset.choice;

        playRound(playerChoice);

    });

});


// Play one round

function playRound(playerChoice) {

    const randomIndex = Math.floor(Math.random() * choices.length);

    const computerChoice = choices[randomIndex];

    // Display both choices

    playerPick.textContent = getEmoji(playerChoice);
    computerPick.textContent = getEmoji(computerChoice);

    playerPickName.textContent = playerChoice;
    computerPickName.textContent = computerChoice;

    // Decide winner

    if (playerChoice === computerChoice) {

        roundResult.textContent = "Round Draw!";

    } else if (

        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")

    ) {

        playerScore++;

        roundResult.textContent = "You Won This Round!";

    } else {

        computerScore++;

        roundResult.textContent = "Computer Won This Round!";

    }

    // Update scores

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    // Check whether match has ended

    if (playerScore === 5) {

        endMatch("WON");

    } else if (computerScore === 5) {

        endMatch("LOST");

    }

}


// End match and record only final result

function endMatch(result) {

    gameOver = true;

    choiceButtons.forEach(function(button) {
        button.disabled = true;
    });

    restartButton.disabled = false;

    roundResult.textContent = result === "WON"
        ? "🎉 Congratulations! You won the match!"
        : "Game Over! Computer won the match.";

    // Create one completed match record

    const match = {
        result: result,
        playerScore: playerScore,
        computerScore: computerScore
    };

    matchHistoryData.push(match);

    // Display completed match history

    updateMatchHistory();

}


// Display only completed matches

function updateMatchHistory() {

    matchHistory.innerHTML = "";

    matchHistoryData.forEach(function(match, index) {

        const li = document.createElement("li");

        li.textContent =
            "Match " + (index + 1) +
            " - " + match.result +
            " | You: " + match.playerScore +
            " - Computer: " + match.computerScore;

        matchHistory.appendChild(li);

    });

}


// Restart match

restartButton.addEventListener("click", function() {

    playerScore = 0;
    computerScore = 0;
    gameOver = false;

    playerScoreDisplay.textContent = "0";
    computerScoreDisplay.textContent = "0";

    playerPick.textContent = "❔";
    computerPick.textContent = "❔";

    playerPickName.textContent = "Not Selected";
    computerPickName.textContent = "Waiting...";

    roundResult.textContent = "New match started! Make your move.";

    choiceButtons.forEach(function(button) {
        button.disabled = false;
    });

    restartButton.disabled = true;

    // Keep previous completed match history

});
