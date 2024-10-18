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
var guesses = [];
var correct = false;
var displayTxt = "\0";

function OnLoad(){    

    if(sessionStorage.getItem('attempts') != null){
        attempts = parseInt(sessionStorage.getItem('attempts'));
    }else{
        sessionStorage.setItem('attempts','0');
    }

    if(sessionStorage.getItem('guesses') != null){
        guesses = JSON.parse(sessionStorage.getItem('guesses'));
    }else{
        sessionStorage.setItem('guesses', JSON.stringify(guesses));
    }
    
    if(sessionStorage.getItem('correct') != null){
        correct = JSON.parse(sessionStorage.getItem('correct'));
    }else{
        sessionStorage.setItem('correct', JSON.stringify(correct));
    }
    
    if(sessionStorage.getItem('displayTxt') != null){
        displayTxt = sessionStorage.getItem('displayTxt');
    }else{
        sessionStorage.setItem('displayTxt', displayTxt);
    }

    document.getElementById("display-text").innerHTML = displayTxt;

    populateAttempts();
    showHints();
}

function populateAttempts(){
    document.getElementById("display-tentativas").innerHTML = "Tentativas Anteriores: " + attempts;

    let tabela = document.querySelector('.guesses');;
    
    for(g in guesses){
        let guessRow = tabela.insertRow(0);    
        let guessCell = guessRow.insertCell(0);

        guessCell.innerHTML = guesses[g];

        guessCell.classList.add(getWordRelation(guesses[g]));
        console.log(g);
    }
}

function checkGuess(){
    attempts++;
    document.getElementById("display-tentativas").innerHTML = "Tentativas Anteriores: " + attempts;
    
    sessionStorage.setItem('attempts', attempts.toString());

    var guess = document.getElementById("guess-input").value.toLowerCase();
    document.getElementById("guess-input").value = "";
    console.log('Player guessed ' +  guess + '.');

    guesses.push(guess);
    sessionStorage.setItem('guesses', JSON.stringify(guesses));

    let tabela = document.querySelector('.guesses');

    let guessRow = tabela.insertRow(0);    
    let guessCell = guessRow.insertCell(0);
    
    guessCell.innerHTML = guess;
    guessCell.classList.add(getWordRelation(guess));

    if(getWordRelation(guess) === "correct"){
        correct = true;
        sessionStorage.setItem('correct', JSON.stringify(correct));

        console.log('correct!!!!');
        sessionStorage.setItem('displayTxt', 'ACERTOU!');
        document.getElementById("display-text").innerHTML = "ACERTOU!";
        showHints();
    }
    else{        
        sessionStorage.setItem('displayTxt', 'ERROU!');
        document.getElementById("display-text").innerHTML = "ERROU!";
        showHints();
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

function showHints(){
    if(correct === true){
        document.getElementById("word-text").innerHTML = word;
    }
    for(h in hints){
        if(attempts >= h || correct === true){
            var id = "hint" + h;
            document.getElementById(id).innerHTML = hints[h];       
        }
    }
}

function clearData(){
    sessionStorage.clear();
}

function clearGuessTags(elementID){
    document.getElementById(elementID).classList.remove("correct")
    document.getElementById(elementID).classList.remove("opposite")
    document.getElementById(elementID).classList.remove("sinonym")
    document.getElementById(elementID).classList.remove("unrelated")
}