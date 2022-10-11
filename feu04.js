function plusGrandCarre(plateau) {
    if (process.argv.length !== 3) {
        return 'Erreur de paramètres'
    }

    const fs = require("fs");

    let plateauTXT = fs.readFileSync(plateau, 'utf-8').split('\n');
    plateauTXT.pop();

    console.log(plateauTXT)


}

console.log(plusGrandCarre(process.argv[2]))