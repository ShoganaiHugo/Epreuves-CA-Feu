function plusGrandCarre(plateau) {
    if (process.argv.length !== 3) {
        return 'Erreur de paramètres'
    }

    const fs = require("fs");

    let plateauTXT = fs.readFileSync(plateau, 'utf-8').split('\n');
    plateauTXT.pop();

    for (let line = 0; line < plateauTXT.length; line++) {
        plateauTXT[line] = plateauTXT[line].split('');
    }

    let maxLine = 0;
    let l = 0;
    let c = 0;
    let maxColumn = 0;

    for (let line = 0; line < plateauTXT.length - 1; line++) {
        for (let column = 0; column < plateauTXT[line].length - 1; column++) {
            if (plateauTXT[line][column] !== 'x') {
                                
            }
                
                
        }
    }

    for (let line = 0; line < plateauTXT.length; line++) {
        plateauTXT[line] = plateauTXT[line].join('');
    }

    console.log(plateauTXT.join('\n'));


}

return plusGrandCarre(process.argv[2]);