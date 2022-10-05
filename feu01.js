// Permet d'isoler les paranthèses dans un nouveau tableau
function isolationParantheses(array) {
	// On initialise les index des paranthèses et le tableau de resultat
	let indexOuverte = array.indexOf('(');
	let indexFermee = array.indexOf(')');
	let count = 0;
	let arrResult = [];

	// On isole le contenu des paranthèses dans un nouveau tableau
	// On en profite pour remplacer les éléments déplacés par des cases vides
	for (let i = indexOuverte + 1; i < indexFermee; i++) {
		arrResult[count] = array[i];
		array[i] = '';
		count++;
	}

	// On incrémente le nouveau tableau dans le 1er pour ne pas perdre la localisation du contenu des paranthèses
	array[indexOuverte] = arrResult;
	array[indexFermee] = '';

	return arrResult;
}


// Permet de calculer + ou - une fois que les prioritées *, /, % et () ont étaient gérés
function calculGaucheDroite(array) {
	// On boucle à travers le tableau, si on trouve + ou - on fait le calcul entre i+1 et i-1
	for (let i = 0; i < array.length; i++) {
		if (array[i] === '+') {
			// On stock le résultat dans i-1, et on supprime i et i+1
			array[i - 1] = Number(array[i - 1]) + Number(array[i + 1]);
			array.splice(i, 2);
		} else if (array[i] === '-') {
			// On stock le résultat dans i-1, et on supprime i et i+1
			array[i - 1] = Number(array[i - 1]) - Number(array[i + 1]);
			array.splice(i, 2);
		}
	}

	// On renvoie un tableau
	return array;
}



// Permet de gérer le calcul des opérateurs prioritaires *, / et %
function prioriteCalcul(array) {
	
	// On boucle tant qu''on trouve l'un des trois signes dans le tableau
	while (array.includes('/') === true || array.includes('*') === true | array.includes('%') === true) {
		
		// Si on trouve /
		if (array.includes('/') === true) {
			// On stock son index
			let indexDivisé = array.indexOf('/');
			// On part de l'index pour calculer i-1 et i+1, qu'on stocke dans i-1 et on supprime i et i+1
			array[indexDivisé - 1] = Number(array[indexDivisé - 1]) / Number(array[indexDivisé + 1]);
			array.splice(indexDivisé, 2);

		// Si on trouve *
		} else if (array.includes('*') === true) {
			// On stock son index
			let indexMultiplié = array.indexOf('*');
			// On part de l'index pour calculer i-1 et i+1, qu'on stocke dans i-1 et on supprime i et i+1
			array[indexMultiplié - 1] = Number(array[indexMultiplié - 1]) * Number(array[indexMultiplié + 1]);
			array.splice(indexMultiplié, 2);

		// Si on trouve %
		} else if (array.includes('%') === true) {
			// On stock son index
			let indexModulo = array.indexOf('%');
			// On part de l'index pour calculer i-1 et i+1, qu'on stocke dans i-1 et on supprime i et i+1
			array[indexModulo - 1] = Number(array[indexModulo - 1]) % Number(array[indexModulo + 1]);
			array.splice(indexModulo, 2);
		}
	}

	// On en profite pour calculer les opérateurs mineurs + et - au cas où
	array = calculGaucheDroite(array);

	// On renvoie un tableau
	return array;
}







//  S T A R T  //






function calcul(aCalculer) {

	// On s'assure qu'on a bien une chaine plus longue qu'une seule instruction
	if (aCalculer.length === 1) {
		return 'error.';	
	} else {

		// On initialise les var qui seront nécessaires par la suite
		let sansEspaces = '';
		let arrayACalculer = [''];
		let count = 0;
		let paranthèses = [''];

		// On copie l'argument dans sansEspace mais sans les espaces de l'argument
		for (let i = 0; i < aCalculer.length; i++) {
			if (aCalculer.charAt(i) !== ' ') {
				sansEspaces += aCalculer.charAt(i);
			}
		}

		// On sépare les éléments our obtenir un tableau type ['1', '+', '2']
		for (let i = 0; i < sansEspaces.length; i++) {
			if (!isNaN(sansEspaces.charAt(i)) === true) {
				arrayACalculer[count] += sansEspaces.charAt(i);
			} else {
				arrayACalculer[count + 1] = sansEspaces.charAt(i);
				count += 2;
				arrayACalculer[count] = '';
			}
		}

		// On filtre le tableau en retournant toutes les valeurs  l'expression des espaces vides
		arrayACalculer = arrayACalculer.filter( function(val){return val !== ''} );
		let index = 0;

		// En premier lieu on s'occupe des paranthèses
		// On appelle isolationParanthèses qu'on stock dans un tableau paranthèses
		while (arrayACalculer.includes('(') === true) {
			paranthèses[index] = isolationParantheses(arrayACalculer);
			index++
		}

		// On filtre le tableau en retournant toutes les valeurs  l'expression des espaces vides
		arrayACalculer = arrayACalculer.filter( function(val){return val !== ''} );

		// On initialse le nombre de paranthèses isolées
		let nbrParanthèses = 0;

		// Tant qu'il existe des paranthèses, on va calculer le contenu
		while (arrayACalculer.includes(paranthèses[nbrParanthèses]) === true) {
			paranthèses[nbrParanthèses] = prioriteCalcul(paranthèses[nbrParanthèses]);
			// On en profite pour remplacer le contenu du tableau, resultat on passe de :
			// tab : ['1', '+', ['2']]   -->     tab : ['1', '+', '2']
			let indexTracker = arrayACalculer.indexOf(paranthèses[nbrParanthèses]);
			arrayACalculer[indexTracker] = paranthèses[nbrParanthèses][0];
			nbrParanthèses++;
		}

		// On filtre le tableau en retournant toutes les valeurs  l'expression des espaces vides
		arrayACalculer = prioriteCalcul(arrayACalculer);

		// Si on a pas déjà un seul résultat alors on va boucler jusqu'à en avoir un
		if (arrayACalculer.length !== 1) {
			while (arrayACalculer.length !== 1) {
				arrayACalculer = calculGaucheDroite(arrayACalculer);
			}
		}

		// On renvoie le contenu du tableau, donc le résultat
		return arrayACalculer.join('');

	}
}

console.log(calcul(process.argv.slice(2)[0]));