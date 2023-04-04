const headsBtn = document.getElementById("headsBtn");
const tailsBtn = document.getElementById("tailsBtn");
const result = document.getElementById("result");
const gamesPlayed = document.getElementById("gamesPlayed");
const gamesWon = document.getElementById("gamesWon");
const historyBody = document.getElementById("historyBody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let games = 0;
let wins = 0;
let historyData = [];
const pageSize = 10;
let currentPage = 1;

function addToHistory(gameNumber, outcome, winLoss) {
    historyData.push({ gameNumber, outcome, winLoss });
    renderHistory();
}

function renderHistory() {
    historyBody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, historyData.length);

    for (let i = start; i < end; i++) {
        const { gameNumber, outcome, winLoss } = historyData[i];
        const row = document.createElement("tr");

        const gameNumberCell = document.createElement("td");
        gameNumberCell.textContent = gameNumber;
        row.appendChild(gameNumberCell);

        const outcomeCell = document.createElement("td");
        outcomeCell.textContent = outcome;
        row.appendChild(outcomeCell);

        const winLossCell = document.createElement("td");
        winLossCell.textContent = winLoss;
        row.appendChild(winLossCell);

        historyBody.appendChild(row);
    }

    pageInfo.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end === historyData.length;
}

function flipCoin(playerChoice) {
    const randomOutcome = Math.random() < 0.5 ? "Heads" : "Tails";
    let winLoss;

    if (randomOutcome === playerChoice) {
        result.textContent = `You win! The coin landed on ${randomOutcome}.`;
        wins++;
        winLoss = "Win";
    } else {
        result.textContent = `You lose! The coin landed on ${randomOutcome}.`;
        winLoss = "Loss";
    }
    games++;
    addToHistory(games, randomOutcome, winLoss);
    gamesPlayed.textContent = games;
    gamesWon.textContent = wins;
}

function nextPage() {
    currentPage++;
    renderHistory();
}

function prevPage() {
    currentPage--;
    renderHistory();
}

headsBtn.addEventListener("click", () => flipCoin("Heads"));
tailsBtn.addEventListener("click", () => flipCoin("Tails"));
nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);
