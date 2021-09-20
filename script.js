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
	console.log("you clicked on square:", square.target.id); //Identify clicked square
	turn(square.target.id, humanPlayer); // calls turn func & sends squareID and Player as arguments
}

// TURN FUNCTION
function turn(squareID, player) {
	originalBoard[squareID] = player;
	document.getElementById(squareID).innerText = player;
}
