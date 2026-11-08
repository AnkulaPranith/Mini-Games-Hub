
// Tic Tac Toe Variables

let currentPlayer = "X";

let board = ["", "", "", "", "", "", "", "", ""];

let gameOver = false;

let historyData = [];


// Winning combinations

const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// Get HTML Elements

const cells = document.querySelectorAll(".tic-cell");

const turnMessage = document.getElementById("turnMessage");

const ticResult = document.getElementById("ticResult");

const restartButton = document.getElementById("restartButton");

const ticHistory = document.getElementById("ticHistory");

const rulesButton = document.getElementById("rulesButton");

const rulesContent = document.getElementById("rulesContent");

const playerX = document.getElementById("playerX");

const playerO = document.getElementById("playerO");


// Show and Hide Rules

rulesButton.addEventListener("click", function () {

    rulesContent.hidden = !rulesContent.hidden;

    rulesButton.textContent = rulesContent.hidden
        ? "Show Game Rules"
        : "Hide Game Rules";

});


// Highlight Current Player

function updatePlayerDisplay() {

    playerX.classList.remove("active-player");

    playerO.classList.remove("active-player");

    if (currentPlayer === "X") {

        playerX.classList.add("active-player");

    } else {

        playerO.classList.add("active-player");

    }

}


// Player Click

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        const index = Number(cell.dataset.index);

        if (gameOver || board[index] !== "") {

            return;

        }

        // Store player move

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.disabled = true;


        // Check winner

        if (checkWinner()) {

            endGame(currentPlayer);

            return;

        }


        // Check draw

        if (!board.includes("")) {

            endGame("DRAW");

            return;

        }


        // Change player

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        turnMessage.textContent = "Player " + currentPlayer + "'s Turn";

        updatePlayerDisplay();

    });

});


// Check Winner

function checkWinner() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (

            board[a] !== "" &&

            board[a] === board[b] &&

            board[b] === board[c]

        ) {

            // Highlight winning boxes

            cells[a].classList.add("winning-cell");

            cells[b].classList.add("winning-cell");

            cells[c].classList.add("winning-cell");

            return true;

        }

    }

    return false;

}


// End Game

function endGame(result) {

    gameOver = true;

    cells.forEach(function (cell) {

        cell.disabled = true;

    });

    restartButton.disabled = false;


    if (result === "DRAW") {

        ticResult.textContent = "🤝 Match Draw!";

        turnMessage.textContent = "Game Completed";

    } else {

        ticResult.textContent = "🎉 Player " + result + " Wins!";

        turnMessage.textContent = "Congratulations Player " + result;

    }


    // Store completed game only

    const completedGame = {

        result: result

    };

    historyData.push(completedGame);

    updateHistory();

}


// Update Game History

function updateHistory() {

    ticHistory.innerHTML = "";

    historyData.forEach(function (game, index) {

        const li = document.createElement("li");

        li.textContent =

            "Game " + (index + 1) +

            " - " +

            (game.result === "DRAW"

                ? "DRAW"

                : "Player " + game.result + " WON");

        ticHistory.appendChild(li);

    });

}


// Restart Game

restartButton.addEventListener("click", function () {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;


    cells.forEach(function (cell) {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove("winning-cell");

    });


    ticResult.textContent = "New game started!";

    turnMessage.textContent = "Player X's Turn";

    restartButton.disabled = true;

    updatePlayerDisplay();

});


// Initialize Game

updatePlayerDisplay();
