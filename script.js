let originalBoard;
const humanPlayer = "O";
const aiPlayer = "X";

const winCombos = [
	// winning by Rows
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// winning by Columns
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// winning by Diags
	[0, 4, 8],
	[6, 4, 2],
];

//reference to each cell in the TTT grid
const cells = document.querySelectorAll(".cell");

//START GAME
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	// create array of 9 elements and is just the keys of the other array
	originalBoard = Array.from(Array(9).keys());
	// clear content
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].style.removeProperty("background-color");
		cells[i].addEventListener("click", turnClick, false);
	}
}

// TURN CLICK - calls turn function when human clicks on square
function turnClick(square) {
	if (typeof originalBoard[square.target.id] == "number") {
		console.log("you clicked on square:", square.target.id); //Identify clicked square
		turn(square.target.id, humanPlayer); // calls turn func & sends squareID and Player as arguments
		if (!checkTie()) turn(bestSpot(), aiPlayer); // if not a tie, then the AI player will take a turn
	}
}

// TURN FUNCTION
function turn(squareID, player) {
	originalBoard[squareID] = player;
	document.getElementById(squareID).innerText = player;
	let gameWon = checkWin(originalBoard, player);
	if (gameWon) gameOver(gameWon);
}

// DETERMINE WINNER
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		// check if game is won
		if (win.every((elem) => plays.indexOf(elem) > -1)) {
			//has the player played in every index of a winning array
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}

// GAME OVER
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener("click", turnClick, false);
	}
	// show if you win or lose
	declareWinner(gameWon.player == humanPlayer ? "You win!" : "You Lose!");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

// BASIC AI

function emptySquares() {
	return originalBoard.filter((s) => typeof s == "number");
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener("click", turnClick, false);
			declareWinner("Tie Game");
			return true;
		}
		return false;
	}
}
