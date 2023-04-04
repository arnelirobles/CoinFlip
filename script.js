const headsBtn = document.getElementById("headsBtn");
const tailsBtn = document.getElementById("tailsBtn");
const result = document.getElementById("result");
const gamesPlayed = document.getElementById("gamesPlayed");
const gamesWon = document.getElementById("gamesWon");

let games = 0;
let wins = 0;

function flipCoin(playerChoice) {
    const randomOutcome = Math.random() < 0.5 ? "Heads" : "Tails";
    if (randomOutcome === playerChoice) {
        result.textContent = `You win! The coin landed on ${randomOutcome}.`;
        wins++;
    } else {
        result.textContent = `You lose! The coin landed on ${randomOutcome}.`;
    }
    games++;
    gamesPlayed.textContent = games;
    gamesWon.textContent = wins;
}

headsBtn.addEventListener("click", () => flipCoin("Heads"));
tailsBtn.addEventListener("click", () => flipCoin("Tails"));
