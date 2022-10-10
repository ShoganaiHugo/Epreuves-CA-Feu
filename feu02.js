// Fonction qui permet de créer un tableau test à partir de deux autres
function creationTableau(arrayModele, arraySearch, line, column) {
	// On définit une STR temporaire, les limites de lignes et colonnes en fonction de la recheche à effectuer
	let lignesMax = arraySearch.length;
	let colonnesMax = arraySearch[0].length;
	let arrayResult = [];
	let tmp = '';
	
	// Boucle qui permet de créer un tableau de test à partir du modele et des coordonnées, de la même forme que la recherche
	for (let lignes = 0; lignes < lignesMax; lignes++) {
		arrayResult[lignes] = '';
		for (let colonnes = 0; colonnes < colonnesMax; colonnes++) {
			arrayResult[lignes] += arrayModele[line + lignes][column + colonnes];
		}
	}

	// Permet de remplacer n'importe quel caractère en fonction de son emplacement par un ' ' ou '-' si la recherche en contient
	for (let i = 0; i < arrayResult.length; i++) {
		for (let j = 0; j < arrayResult[i].length; j++) {
			if (arraySearch[i][j] === ' ') {
				tmp = arrayResult[i].toString();
				tmp = tmp.split('');
				tmp[j] = ' ';
				tmp = tmp.join('');
				arrayResult[i] = tmp;
			} else if (arraySearch[i][j] === '-') {
				tmp = arrayResult[i].toString();
				tmp = tmp.split('');
				tmp[j] = '-';
				tmp = tmp.join('');
				arrayResult[i] = tmp;
			}
		}
	}

	// Renvoie un tableau de test à comparer avec notre recherche
	return arrayResult;
}



//    S  T  A  R  T    //



// Fonction du script qui permet de trouver une forme dans un tableau
function trouverForme(modele, search) {

	// On vérifie que la saisie est correcte
	if (process.argv.length !== 4) {
		return 'Veuillez indiquer 2 fichiers .txt';
	} else {

		// On stocke le contenue des tableaux dans deux variables
		const fs = require("fs");

		let modeleTXT = fs.readFileSync(modele, 'utf-8').split('\n');
		modeleTXT.pop();

		let searchTXT = fs.readFileSync(search, 'utf-8').split('\n');
		searchTXT.pop();

		// On vérifie que la recherche est bien <= au tableau de modèle
		if (searchTXT.length <= modeleTXT.length && searchTXT[0].length  <= modeleTXT[0].length) {

			// On défini les variables qui permettront de stocker le tableau de test, les coordonnées et si on trouve ou non une correspondance
			let location = [modeleTXT.length, modeleTXT[0].length];
			let arrayTest = [];
			let ligne = 0;
			let colonne = 0;
			let trouvable = false;

			// On parcours le modèle
			for (let line = 0; line < modeleTXT.length; line++) {
				for (let column = 0; column < modeleTXT[line].length; column++) {

					// Si le caractère aux coordonnées trouvées est égale à ' ' ou égale au caractère de début de la recherche
					if (searchTXT[0][0] === modeleTXT[line][column] || searchTXT[0][0] === ' ') {

						// On vérifie que le tableau de recherche ne dépasserait pas du tableau modèle s'il commençait aux coordonnées
						if (line + searchTXT.length - 1 <= modeleTXT.length - line && searchTXT[0].length - 1 + column <= modeleTXT.length) {
							
							// On stock le tableau test qui à la même forme que le tableau de recherche
							arrayTest = creationTableau(modeleTXT, searchTXT, line, column);

							// On test si les deux tableaux sont identiques (en STR car on ne peut pas faire tab1 === tab2)
							if (arrayTest.toString() === searchTXT.toString()) {

								// On regarde si les coordonnées trouvées sont plus en haut à droite que les précédentes
								if (line + 1 <= location[0] && - (column + searchTXT[0].length - 1) + (modeleTXT[0].length) <= location[1]) {
									// On enregistre les coordonnées et on affirme qu'on trouve une correspondance
									ligne = line;
									colonne = column;
									location[0] = line + 1;
									location[1] = - (column + searchTXT[0].length - 1) + (modeleTXT[0].length);
									trouvable = true;

									// Permet de remplacer les espaces de la recherche par un '-'
									for (let i = 0; i < searchTXT.length; i++) {
										searchTXT[i] = searchTXT[i].replace(' ', '-');
									}
								}
							}
						}			
					}
				}
			}


			// Si on a trouvé une correspondance
			if (trouvable === true) {

				console.log('Trouvé !');
				console.log('Coordonnées : ' + location[0] + ', ' + location[1]);

				let resultArray = [];
				let tirets = '-';
				let taille = 0;

				// On créé un tableau de résultat de taille = à modeleTXT
				for (let i = 0; i < modeleTXT.length; i++) {
					resultArray[i] = '';
				}

				// On parcours modeleTXT
				for (let i = 0; i < modeleTXT.length; i++) {
					for (let j = 0; j < modeleTXT[i].length; j++) {

						// Si la ligne correspond à la ligne de coordonnées jusqu'à searchTXT.length - 1
						if (i === ligne + taille) {
							// Si la colonne correspond
							if (j === colonne) {
								// On ajoute la ligne correspondant de la recherche
								resultArray[i] += searchTXT[taille];

								// Ensuite si taille < taille max alors on augmente taille pour passer au contenu suivant de searchTXT
								if (taille < searchTXT.length - 1) {
									taille++;
								} else {
									taille = 0;
								}

							// Si la colonne ne correspond pas et que la longeur n'est pas complète alors on ajoute un tiret	
							} else if (resultArray[i].length < modeleTXT[0].length) {
								resultArray[i] += tirets;
							}

						// Si la ligne ne correspond pas et que la longeur n'est pas complète alors on ajoute un tiret
						} else if (resultArray[i].length < modeleTXT[0].length) {
							resultArray[i] += tirets;
						}
					}
				}

				// On affiche le tableau de résultat au bon format
				console.log(resultArray.join('\n'));

			// Si trouvable === false
			} else {
				console.log('Introuvable');
			}

		 // Si searchTXT > modeleTXT
		} else {
			console.log('error.')
		}		
	}
}


return trouverForme(process.argv[2], process.argv[3]);