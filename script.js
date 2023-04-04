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

    const totalPages = Math.ceil(historyData.length / pageSize);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
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

// ... (previous script.js content)

function loadHistoryFromStorage() {
    const historyJSON = localStorage.getItem("flipCoinHistory");
    const timestamp = localStorage.getItem("flipCoinHistoryTimestamp");

    if (historyJSON && timestamp) {
        const now = new Date().getTime();
        const age = now - parseInt(timestamp, 10);

        // Clear history if it's older than 24 hours (24 * 60 * 60 * 1000 milliseconds)
        if (age > 24 * 60 * 60 * 1000) {
            localStorage.removeItem("flipCoinHistory");
            localStorage.removeItem("flipCoinHistoryTimestamp");
            historyData = [];
        } else {
            historyData = JSON.parse(historyJSON);
            games = historyData.length;
            wins = historyData.filter(item => item.winLoss === "Win").length;
            gamesPlayed.textContent = games;
            gamesWon.textContent = wins;
            renderHistory();
        }
    }
}

function saveHistoryToStorage() {
    const historyJSON = JSON.stringify(historyData);
    const timestamp = new Date().getTime();
    localStorage.setItem("flipCoinHistory", historyJSON);
    localStorage.setItem("flipCoinHistoryTimestamp", timestamp);
}

function addToHistory(gameNumber, outcome, winLoss) {
    historyData.push({ gameNumber, outcome, winLoss });
    saveHistoryToStorage();
    renderHistory();
}

loadHistoryFromStorage();

headsBtn.addEventListener("click", () => flipCoin("Heads"));
tailsBtn.addEventListener("click", () => flipCoin("Tails"));
nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);


const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function clearHistory() {
    localStorage.removeItem("flipCoinHistory");
    localStorage.removeItem("flipCoinHistoryTimestamp");
    historyData = [];
    games = 0;
    wins = 0;
    currentPage = 1;
    gamesPlayed.textContent = games;
    gamesWon.textContent = wins;
    renderHistory();
}

clearHistoryBtn.addEventListener("click", clearHistory);

