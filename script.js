let vancea = "https://www.cs.ubbcluj.ro/wp-content/uploads/Vancea-Alexandru.jpg";
let berinde = "https://www.cs.ubbcluj.ro/wp-content/uploads/Berinde-Stefan.jpg";
let gabi = "https://www.cs.ubbcluj.ro/wp-content/uploads/Mircea-Gabriel-small.jpg";
let pop = "https://www.cs.ubbcluj.ro/wp-content/uploads/Mihis-Andreea.jpg";
let dan = "https://www.cs.ubbcluj.ro/wp-content/uploads/Suciu-Dan.jpg";
let sima = "https://www.cs.ubbcluj.ro/wp-content/uploads/Sima-Ioan.jpg";
let czibula = "https://www.cs.ubbcluj.ro/wp-content/uploads/Czibula-Gabriela.jpg";
let istvan = "https://www.cs.ubbcluj.ro/wp-content/uploads/Czibula-Istvan.jpg";
let diosan = "https://www.cs.ubbcluj.ro/wp-content/uploads/Diosan-Laura-300x400.jpg";
let boian = "https://www.cs.ubbcluj.ro/wp-content/uploads/Boian-Rares-133x100.jpg";

let hidden = "https://static.vecteezy.com/ti/vettori-gratis/t2/440467-icona-di-vettore-del-punto-interrogativo-gratuito-vettoriale.jpg";

let link = "https://raw.githack.com/davidAnicca/guess/main/index.html"

const matrix = [
    [vancea, vancea, gabi, dan],
    [berinde, berinde, gabi, dan],
    [pop, pop, sima, sima],
    [czibula, czibula, istvan, istvan],
    [boian, boian, diosan, diosan]
];

let first = "";
let firstR = "";
let firstC = "";

let found = 0;
let all = 0;

function shuffleMatrix() {
    for (let i = matrix.length - 1; i > 0; i--) {
        for (let j = matrix[i].length - 1; j > 0; j--) {
            const randI = Math.floor(Math.random() * (i + 1));
            const randJ = Math.floor(Math.random() * (j + 1));
            [matrix[i][j], matrix[randI][randJ]] = [matrix[randI][randJ], matrix[i][j]];
        }
    }
    return matrix;
}


function set(row, col) {
    document.getElementById("game").rows[row].cells[col].style.backgroundImage = "url(" + matrix[row][col] + ")";
    document.getElementById("game").rows[row].cells[col].textContent = "";
}

function reset(row, col) {
    document.getElementById("game").rows[row].cells[col].style.backgroundImage = "url(" + hidden + ")";
    window.onclick = function (event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

function check() {
    if (all === found) {
        window.alert("Genius!");
        location.reload();
    }
}

function nasm() {
    const modal = document.getElementById("vanceaPopup");
    modal.style.display = "block";
    setTimeout(() =>{
        modal.style.display = "none";
    }, 2000);
}

function clickOnGame(event) {
    const cell = event.target;
    if (cell.classList.contains("found")) {
        return;
    }
    const colIndex = cell.cellIndex;
    const rowIndex = cell.parentNode.rowIndex;
    set(rowIndex, colIndex);
    if (first === "") {
        first = matrix[rowIndex][colIndex];
        firstR = rowIndex;
        firstC = colIndex;
    } else if (first !== matrix[rowIndex][colIndex]) {
        document.getElementById("game").style.pointerEvents = "none";
        setTimeout(() => {
            reset(rowIndex, colIndex)
            reset(firstR, firstC);
            first = "";
            firstR = "";
            firstC = "";
            document.getElementById("game").style.pointerEvents = "auto";
        }, 1000);
    } else {
        document.getElementById("game").rows[firstR].cells[firstC].classList.add("found");
        cell.classList.add("found");
        if (first === vancea) {
            nasm();
        }
        first = "";
        firstR = "";
        firstC = "";
        found += 2;
        setTimeout(() => {
            check();
        }, 1000);
    }
}


function start() {
    shuffleMatrix();
    const table = document.getElementById("game");
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode("");
            cell.style.backgroundImage = "url(" + hidden + ")";
            cell.appendChild(cellText);
            row.appendChild(cell);
            all++;
        }
        table.appendChild(row);
    }
    table.addEventListener("click", clickOnGame);
}