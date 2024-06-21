console.log("Hello World!")

const gameBoard = document.querySelector("#board")
const info = document.querySelector("#info")
const newGame = document.querySelector("#new-game")
let go = "circle"
const struct = [
    "", "", "",
    "", "", "",
    "", "", ""
]
info.textContent = `${go.toUpperCase()} Starts The Game`;


function createGameBoard() {
    struct.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameBoard.append(cellElement)
    })
}

function addGo() {

    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    this.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    console.log(go);
    info.textContent = `It's now ${go}'s Turn!`;
    this.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombo.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("circle"))
        if (circleWins) {
            info.textContent = `Circle Wins`;
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true))
            })
        }
    })

    winningCombo.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains("cross"))
        if (crossWins) {
            info.textContent = `Cross Wins`;
            allSquares.forEach(square => {
                square.replaceWith(square.cloneNode(true))
            })
        }
    })
}
newGame.addEventListener("click", ()=>{
    window.location.reload();
});
createGameBoard()