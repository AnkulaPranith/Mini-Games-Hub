

// Game information stored in JSON format

const gamesJSON = `[
    {
        "name": "Number Guessing",
        "icon": "🔢",
        "description": "Guess the secret number between 1 and 100 within 7 attempts.",
        "link": "games/number-guessing.html"
    },
    {
        "name": "Rock Paper Scissors",
        "icon": "✊",
        "description": "Challenge the computer in this classic game. First to 5 wins!",
        "link": "games/rock-paper-scissors.html"
    },
    {
        "name": "Memory Card Game",
        "icon": "🧠",
        "description": "Flip the cards, remember their positions, and find all matching pairs.",
        "link": "games/memory-game.html"
    },
    {
        "name": "Tic Tac Toe",
        "icon": "❌",
        "description": "Play the classic two-player game and get three marks in a row to win.",
        "link": "games/tic-tac-toe.html"
    }
]`;

// Convert JSON string into JavaScript objects

const games = JSON.parse(gamesJSON);

// Get the game container

const gamesContainer = document.getElementById("gamesContainer");

// Generate game cards dynamically

games.forEach(function(game) {

    const gameCard = `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="game-card">

                <div class="game-icon">${game.icon}</div>

                <h4>${game.name}</h4>

                <p>${game.description}</p>

                <a href="${game.link}" class="game-btn">
                    Play Now
                </a>

            </div>
        </div>
    `;

    gamesContainer.innerHTML += gameCard;

});
