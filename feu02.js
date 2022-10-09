function longueur(array) {
	let nb = 0;
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			nb++
		}
	}

	return nb;
}


function creationTableau(arrayModele, arraySearch, line, column) {
	let lignesMax = arraySearch.length;
	let colonnesMax = arraySearch[0].length;
	let arrayResult = [];
	let tmp = '';
	
	for (let lignes = 0; lignes < lignesMax; lignes++) {
		arrayResult[lignes] = '';
		for (let colonnes = 0; colonnes < colonnesMax; colonnes++) {
			arrayResult[lignes] += arrayModele[line + lignes][column + colonnes];
		}
	}

	for (let i = 0; i < arrayResult.length; i++) {
		for (let j = 0; j < arrayResult[i].length; j++) {
			if (arraySearch[i][j] === ' ') {
				tmp = arrayResult[i].toString();
				tmp = tmp.split('');
				tmp[j] = ' ';
				tmp = tmp.join('');
				arrayResult[i] = tmp;
			}
		}
	}

	return arrayResult;
}





function trouverForme(modele, search) {

	if (process.argv.length !== 4) {
		return 'Veuillez indiquer 2 fichiers .txt';
	} else {

		const fs = require("fs");

		let modeleTXT = fs.readFileSync(modele, 'utf-8').split('\n');
		modeleTXT.pop();

		let searchTXT = fs.readFileSync(search, 'utf-8').split('\n');
		searchTXT.pop();

		let count = 0;
		let location = [];
		let arrayTest = [];
		let ligne = 0;
		let colonne = 0;
		let trouvable = false;


		for (let line = 0; line < modeleTXT.length - 1; line++) {
			for (let column = 0; column < modeleTXT[line].length - 1; column++) {

				if (searchTXT[0][0] === modeleTXT[line][column]) {
					
					arrayTest = creationTableau(modeleTXT, searchTXT, line, column);

					if (arrayTest.toString() === searchTXT.toString()) {

						ligne = line;
						colonne = modeleTXT[0].length - column + 1;
						location = [line + 1, modeleTXT[0].length - column];
						trouvable = true;

						for (let i = 0; i < searchTXT.length; i++) {
							searchTXT[i] = searchTXT[i].replace(' ', '-');
						}

						break;
					}
				
				}

			}


		}



		if (trouvable === true) {
			console.log('Trouvé !');
			console.log('Coordonnées : ' + location[0] + ', ' + location[1]);
			
			


			let resultArray = [];
			let tirets = '-';

			for (let i = 0; i < modeleTXT.length; i++) {
				resultArray[i] = '';
			}

			for (let i = 0; i < modeleTXT.length; i++) {
				for (let j = 0; j < modeleTXT[i].length; j++) {

					if (i === ligne) {
						if (j === colonne) {
							resultArray[i] += searchTXT[0][0];
						} else if (j === colonne + 1) {
							resultArray[i] += searchTXT[0][1];
						} else {
							resultArray[i] += tirets;
						}

					} else if (i === ligne + 1) {
						if (j === colonne) {
							resultArray[i] += searchTXT[1][0];
						} else if (j === colonne + 1) {
							resultArray[i] += searchTXT[1][1];
						} else {
							resultArray[i] += tirets;
						}

					} else {
						resultArray[i] += tirets;
					}
				}
			}



			//console.log(resultArray.join('\n'));
			console.log(arrayTest);

		} else {
			console.log('Introuvable');
			console.log(arrayTest)
		}
	}
}


return trouverForme(process.argv[2], process.argv[3]);