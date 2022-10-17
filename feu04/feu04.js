// On vérifie que les paramètres saisis sont bons
function verifArg(arg){
    if(arg !== 1){
        return false;
    }
    return true;
}


// On vérifie que l'argument est un .txt
function verifFileIsTXT(arg){
    if(!arg.endsWith(".txt")){
        return false;
    }
    return true;
}


// On vérifie que les lignes sont bien égales
function verifLinesLongueur(array){
    for(let i = 0; i < array.length; i++){
        if(i > 0){
            if(array[i].length !== array[i-1].length || !array[i].length){
                return false;
            }
        }
    }
    return true;
}


// On vérifie que les caractères du plateau sont uniquement ceux de la première ligne du fichier
function verifChars(prop, arrayToCheck){
    for(let i = 0; i < arrayToCheck.length; i++){
        for(let j = 0; j < arrayToCheck.length; j++){
            if(!prop.includes(arrayToCheck[i][j], 1)){
                return false;
            }
        }
    }
    return true;
}


// On fait les vérifications
function verifGlobal(){
    if(!verifArg(argList.length)){
        return false;
    }
    if(!verifFileIsTXT(argList[0])){
        return false;
    }
    if(!verifLinesLongueur(board)){
        return false;
    }
    if(!verifChars(boardProperties, board)){
        return false;
    }
    return true;
}


// On transforme le .txt en array
function txtToArray(file){
    const content = readFileSync(file, 'utf-8');
    const arrayContent = content.split("\n");
    let arrayResult = [];

    for(let i = 0; i < arrayContent.length; i++){
        let tmp = [];

        for(j = 0; j < arrayContent[i].length; j++){
            tmp.push(arrayContent[i][j]);
        }
        arrayResult.push(tmp);
    }
    return arrayResult;
}


// On cherche le plus grand carré
function findLargestSquare(array, properties){
    const obstacle = properties[2];
    let size = 1;
    let squareProp = [0, 0, 1];
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            // On défini les coordonnées du point de départ
            let firstLine = i;
            let firstColumn = j;
            while(size + firstColumn < array[i].length - 1 && size + firstLine < array.length - 1){
                let obstacleFound = tryDrawSquare(array, firstLine, firstColumn, obstacle, size);
                if(!obstacleFound){
                    if(squareProp[2] < size){
                        squareProp[2] = size;
                        squareProp[0] = firstLine;
                        squareProp[1] = firstColumn;
                    }
                    size++;
                }
                else{
                    break;
                }
            }
            // Si le carré dépasse, on passe à la ligne suivante
            if(size + firstColumn >= array[i].length - 1 || size + firstLine >= array.length - 1){
                break;
            }
        }
    }
    return squareProp;
}


// On essaye de dessiner un carré sur le plateau, renvoie la taille en cas de succès
function tryDrawSquare(array, line, col, obs, size){
    let newArray = array;
    const squareLen = line + size;
    const squareHei = col + size;

    for(let i = line; i < squareLen; i++){
        for(let j = col; j < squareHei; j++){
            if(newArray[i][j] == obs){
                return true;
            }
        }
    }
    return false;
}


// On dessine le plus grand carré possible
function drawLargestSquare(array, squareProp, draw){
    const firstLine = parseInt(squareProp[0]);
    const firstCol = parseInt(squareProp[1]);
    const squareSize = parseInt(squareProp[2]);
    const squareHei = firstLine + squareSize;
    const squareLen = firstCol + squareSize;
    for(let i = firstLine; i < squareHei; i++){
        for(let j = firstCol; j < squareLen; j++){
            array[i][j] = draw;
        }
    }
    return array;
}


// On formatte le résultat
function formatResult(array){
    let result = "";

    for(let i = 0; i < array.length; i++){
        let lineLength = array[i].length;
        for(let j = 0; j < lineLength; j++){
            if(!result){
                result = array[i][j];
            }
            else{
                result = result + array[i][j];
            }
        }
        if(i < array.length - 1){
            result = result + "\n";
        }
    }
    return result;
}


// Parsing
const {readFileSync, promises:fsPromises} = require('fs');
const argList = process.argv.splice(2, process.argv.length-1);
const fileIntoArray = txtToArray(argList[0]);
const boardProperties = fileIntoArray[0];
const board = fileIntoArray.splice(1, fileIntoArray.length-1);


// Error management
if(!verifGlobal()){
    console.log("error");
    return;
}


// Resolution
largestSquare = findLargestSquare(board, boardProperties);
result = drawLargestSquare(board, largestSquare, boardProperties[3]);
finalResult = formatResult(result);


// Result
console.log(finalResult);