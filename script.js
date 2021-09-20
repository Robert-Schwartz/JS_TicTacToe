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


