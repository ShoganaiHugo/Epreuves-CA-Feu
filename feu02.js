function longueur(array) {
	let nb = 0;
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			nb++
		}
	}

	return nb;
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
		let long = 0;
		let ligne = 0;
		let colonne = 0;
		let trouvable = false;

		for (let line = 0; line < modeleTXT.length; line++) {
			for (let column = modeleTXT[line].length; column > 0; column--) {
				if (searchTXT[0][0] === modeleTXT[line][column - 1] || searchTXT[0][0] === " ") {
					if (searchTXT[0][1] === modeleTXT[line][column] || searchTXT[0][1] === " ") {
						if (searchTXT[1][0] === modeleTXT[line + 1][column - 1] || searchTXT[1][0] === " ") {
							if (searchTXT[1][1] === modeleTXT[line + 1][column] || searchTXT[1][1] === " ") {

								ligne = line;
								colonne = longueur(modeleTXT[0]) - column + 1;
								location = [line + 1, longueur(modeleTXT[0]) - column];
								trouvable = true;

								for (let i = 0; i < searchTXT.length; i++) {
									searchTXT[i] = searchTXT[i].replace(' ', '-');
								}


							}
						}
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



			console.log(resultArray.join('\n'));

		} else {
			console.log('Introuvable');
			console.log(long)
		}
	}
}


return trouverForme(process.argv[2], process.argv[3]);