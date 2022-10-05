function rectangle(directives) {

	if (directives.length !== 2 || isNaN(directives[0]) === true || isNaN(directives[1]) === true || Math.sign(directives[0]) === -1 || Math.sign(directives[0]) === 0 || Math.sign(directives[1]) === -1 || Math.sign(directives[1]) === 0) {
		console.log('error.');	
	} else {

		// On initialise la longueur, le nombre de lignes
		let longueur = Number(directives[0]);
		let lignes = Number(directives[1]);
		// On prepare les str qu'on affichera
		let firstLastLine = '';
		let middleLine = '';
		// On prévoit les caractère qui se repeteront sur chaque ligne en fonction de la taille
		let tirets = '-';
		let espaces = ' ';


		// On enregistre la prmeiere et la dernière lignes en fonction de longueur
		if (longueur <= 2) {
			firstLastLine = 'o';
			firstLastLine = firstLastLine.repeat(longueur);
		} else {
			firstLastLine = 'o' + tirets.repeat(longueur - 2) + 'o';
		}


		// On enregistre la ligne du milieu en fonction de longueur
		if (lignes === 1) {
			console.log(firstLastLine);
		} else if (lignes === 2) {
			console.log(firstLastLine);
			console.log(firstLastLine);
		} else {
			if (longueur <= 2) {
				middleLine = '|';
				middleLine = middleLine.repeat(longueur);
			} else {
				middleLine = '|' + espaces.repeat(longueur - 2) + '|';
			}

			// On affiche la première ligne
			console.log(firstLastLine);

			// On répète la ligne du milieu avec lignes - 2 (car on a déjà la première et dernière ligne)
			for (let i = 0; i < lignes - 2; i++) {
				console.log(middleLine);
			}

			// On affiche la dernière ligne
			console.log(firstLastLine);

		}

	}
}

return rectangle(process.argv.slice(2));