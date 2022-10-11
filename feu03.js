function solve(grid) {
	// On parcourt la grille pour remplacer les 0 par des chiffres valides
	for (let line = 0; line < 9; line++) {
		for (let column = 0; column < 9; column++) {
			// Si on trouve un 0 on essaye de le remplacer par n
			if (grid[line][column] === 0) {
				for (let n = 1; n < 10; n++) {
					// On vérifie d'abord qu'il n'est pas déjà contenu
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


// Fonction qui permet de vérifier la validiter d'un nombre
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

	// Si les conditions précedement citées sont bonnes
	return true;

}

//    S  T  A  R  T    //


function sudoku(base) {

	// On vérifie que la commande est correcte
	if (process.argv.length !== 3) {
		return 'Veuillez indiquer 2 fichiers .txt';
	} else {

		// On récupère le tableau
		const fs = require("fs");

		let sTXT = fs.readFileSync(base, 'utf-8').split('\n');
		sTXT.pop();

		// On fait de chaque ligne un tableau ainsi : ['123'] devient [['1', '2', '3']]
		for (let line = 0; line < sTXT.length; line++) {
			sTXT[line] = sTXT[line].split('');
		}

		// On remplace les espaces vides par des 0 et les chiffres en str par des numbers
		for (let line = 0; line < sTXT.length; line++) {
			for (let column = 0; column < sTXT[line].length; column++) {
				if (sTXT[line][column] === ' ' || sTXT[line][column] === '.' || sTXT[line][column] === '_' || sTXT[line][column] === '-' ) {
					sTXT[line][column] = 0;
				} else {
					sTXT[line][column] = Number(sTXT[line][column]);
				}
			}
		}

		// On appelle ensuite la fonction de résolution
		sTXT = solve(sTXT);

		// On rassemble les lignes en str
		for (let i = 0; i < sTXT[0].length; i++) {
			sTXT[i] = sTXT[i].join('');
		}

		// On affiche le résultat au bon format
		console.log(sTXT.join('\n'));
	}
}

return sudoku(process.argv[2]);