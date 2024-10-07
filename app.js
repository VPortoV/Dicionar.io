/*var word = "ciclone";
const hints = [
"1. Centro de baixa pressão atmosférica que se caracteriza pelo movimento intenso de correntes de ar, que convergem dos bordos para o centro e se deslocam para fora a alturas mais elevadas da troposfera; centro de baixa pressão.",
"2. Tempestade de ventos muito violentos que giram em turbilhão e se deslocam a grande velocidade.",
"3. Qualquer aparelho que gira em movimento turbilhonar e que se destina a separar, pela força centrífuga, partículas em suspensão num fluido líquido ou gasoso."
];
const similar = ["furacão", "tufão", "tornado", "ecnéfia", "vara", "vendaval", "vento"]
const opposite = [];
*/

var word = "socorrer";
const hints = [
"1. Trazer ou pedir auxílio, esmola ou remédio; proteger(-se), valer(-se).",
"2. Prestar ajuda a (alguém) que está em perigo; acudir, salvar.",
"3. Lançar mão de; usar, empregar."
];
const similar = ["ajudar", "acorrer", "acudir", "amparar", "apadrinhar", "apoiar", "assistir", "auxiliar", "contribuir", "facilitar", "favorecer", "privilegiar", "secundar", "valer", "proteger"]
const opposite = ["dessocorrer", "atarantar", "atravancar", "confundir", "desamparar", "desarranjar", "emaranhar", "ambaraçar", "embaralhar", "inibir", "empatar", "enlear", "enredar", "entravar", "estorvar", "impedir", "inibir", "pear", "perturbar", "prejudicar", "tolher", "transtornar"];

var attempts = 0;
var oldGuess = "";
var oldGuessType = "unrelated";

function OnLoad(){
    document.getElementById("hint1").innerHTML = hints[0];
}

function checkGuess(){
    attempts++;

    clearGuessTags("last-guess");
    clearGuessTags("oldest-guess");
    
    var display = document.getElementById("display-text");
    var guess = document.getElementById("guess-input").value.toLowerCase();
    document.getElementById("guess-input").value = "";
    console.log(guess);
    
    document.getElementById("last-guess").innerHTML = guess;
    document.getElementById("oldest-guess").innerHTML = oldGuess;

    oldGuess = guess;
    document.getElementById("oldest-guess").classList.add(oldGuessType);
    
    var r = getWordRelation(guess);
    oldGuessType = r;

    document.getElementById("last-guess").classList.add(r);

    if(r === "correct"){
        document.getElementById("word-text").innerHTML = word;
        display.innerHTML = "ACERTOU!";
    }
    else{        
        display.innerHTML = "ERROU!"
        showHint();
    }
}

function getWordRelation(guess){
    if(guess === word){
        return "correct";
    }
    else if(similar.includes(guess)){
        return "sinonym";
    }
    else if (opposite.includes(guess)){
        return "opposite";
    }
    else{
        return "unrelated";
    }
}

function showHint(){
    if(attempts < hints.length){
        var h = "hint" + (attempts + 1);
        console.log(h)
        document.getElementById(h).innerHTML = hints[attempts];       
    }
}

function clearGuessTags(elementID){
    document.getElementById(elementID).classList.remove("correct")
    document.getElementById(elementID).classList.remove("opposite")
    document.getElementById(elementID).classList.remove("sinonym")
    document.getElementById(elementID).classList.remove("unrelated")
}