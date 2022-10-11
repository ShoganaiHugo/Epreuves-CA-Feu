function solve(grid) {
	
	for (let line = 0; line < 9; line++) {
		for (let column = 0; column < 9; column++) {
			if (grid[line][column] === 0) {
				for (let n = 1; n < 10; n++) {
					if (nValide(line, column, n, grid) === true) {
						grid[line][column] = n;
						solve(grid);
					}
				}
			}
		}
	}

	return grid;
}


function nValide(line, column, n, grid){
	// On vérifie que n n'est pas présent sur sa colonne
	for (let columnTest = 0; columnTest < grid.length; columnTest++) {
		if (grid[line][columnTest] === n) {
			return false
		}
	}

	// On vérifie que n n'est pas présent sur sa ligne
	for (let lineTest = 0; lineTest < grid.length; lineTest++) {
		if (grid[lineTest][column] === n) {
			return false
		}
	}

	// On vérifie que n n'est pas présent dans sa sous grille
	let columnStart = ((column - (column % 3)) / 3) * 3;
	let lineStart = ((line - (line % 3)) / 3) * 3;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[lineStart + i][columnStart + j] === n) {
				return false;
			}
		}
	}

	return true;

}

//    S  T  A  R  T    //


function sudoku(base) {

	if (process.argv.length !== 3) {
		return 'Veuillez indiquer 2 fichiers .txt';
	} else {

		const fs = require("fs");

		let sTXT = fs.readFileSync(base, 'utf-8').split('\n');
		sTXT.pop();

		for (let line = 0; line < sTXT.length; line++) {
			sTXT[line] = sTXT[line].split('');
		}

		for (let line = 0; line < sTXT.length; line++) {
			for (let column = 0; column < sTXT[line].length; column++) {
				if (sTXT[line][column] === ' ' || sTXT[line][column] === '.' || sTXT[line][column] === '_' || sTXT[line][column] === '-' ) {
					sTXT[line][column] = 0;
				} else {
					sTXT[line][column] = Number(sTXT[line][column]);
				}
			}
		}

		sTXT = solve(sTXT);

		for (let i = 0; i < sTXT[0].length; i++) {
			sTXT[i] = sTXT[i].join('');
		}

		console.log(sTXT.join('\n'));
		
	}
}

return sudoku(process.argv[2]);