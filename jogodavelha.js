const board = document.getElementById("board");
const casinhas = board.getElementsByClassName("casinha");
const boxVencedor = document.getElementById("vencedor");
const lastWinnerDiv = document.getElementById("last-winner");
const winnersList = document.getElementById("winners");

let jogadas = 0;
let lastWinner = "Nenhum";
let winners = [];
let currentPlayer = "X";

const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");

for (let i = 0; i < casinhas.length; i++) {
    casinhas[i].addEventListener('click', casinhaclick);
}

function casinhaclick() {
    if (this.innerHTML === "") {
        this.innerHTML = currentPlayer;
        jogadas++;
        if (jogadas >= 5) {
            if (verificaGanhador()) {
                setTimeout(resetGame, 3000); // Reseta o jogo após 3 segundos
                return;
            }
        }
        if (jogadas === 9) {
            boxVencedor.innerHTML = "Empate!";
            setTimeout(resetGame, 3000); // Reseta o jogo após 3 segundos
        } else {
            switchPlayer();
        }
    }
}

function verificaGanhador() {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    for (const [a, b, c] of combinacoes) {
        if (casinhas[a].innerHTML && 
            casinhas[a].innerHTML === casinhas[b].innerHTML &&
            casinhas[a].innerHTML === casinhas[c].innerHTML) {
            const winnerName = currentPlayer === "X" ? player1NameInput.value || "Jogador 1" : player2NameInput.value || "Jogador 2";
            boxVencedor.innerHTML = `${winnerName} ('${currentPlayer}') Venceu!`;
            casinhas[a].classList.add('winner');
            casinhas[b].classList.add('winner');
            casinhas[c].classList.add('winner');
            lastWinner = currentPlayer;
            lastWinnerDiv.textContent = `Último ganhador: ${winnerName}`;
            addWinnerToList(winnerName);
            return true;
        }
    }
    return false;
}

function resetGame() {
    for (let i = 0; i < casinhas.length; i++) {
        casinhas[i].innerHTML = "";
        casinhas[i].classList.remove('winner');
    }
    boxVencedor.innerHTML = "";
    jogadas = 0;
    currentPlayer = "X";
}

function addWinnerToList(winner) {
    winners.push(winner);
    updateWinnersList();
}

function updateWinnersList() {
    winnersList.innerHTML = "";
    for (let i = winners.length - 1; i >= 0; i--) {
        const li = document.createElement("li");
        li.textContent = winners[i];
        winnersList.appendChild(li);
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}
