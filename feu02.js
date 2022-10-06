function trouverForme(modele, search) {

	const fs = require("fs");
	let modeleTXT = fs.readFileSync(modele, 'utf-8');

	return modeleTXT;

}



console.log(trouverForme("board.txt", "to_find.txt"));