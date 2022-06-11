const CORRECT_ANSWER_ID = "answer-area";
const PLAYER_GUESS_ID = "player-guess";
const PREVIOUS_GUESSES_ID = "previous-guesses";

const VICTORY_MODAL_BODY_ID = "victory-modal-body";
const VICTORY_MODAL = new bootstrap.Modal('#staticBackdrop');

var correctAnswer = ["Donald", "Trump", "in", "Danganronpa"];
var wordsGuessed = [];
var guessesSoFar = [];
var correctWordIndices = [];

function updateCorrectAnswer() {
    let outputString = "";
    let correct = true;

    for (let i = 0; i < correctAnswer.length; i++) {
        let word = correctAnswer[i];
        if (correctWordIndices.includes(i)) {
            outputString += `${word} `;
        }
        else {
            outputString += `<span class="redacted">${word}</span> `;
            correct = false;
        }
    }

    outputString.trim();
    document.getElementById(CORRECT_ANSWER_ID).innerHTML = outputString;

    if (correct) {
        victory();
    }
}

function victory() {
    let guessPlural = guessesSoFar.length == 1 ? "guess" : "guesses";
    let topText = `The prompt for this DALL-E output was <b>${correctAnswer.join(" ")}</b>.`;
    let bottomText = `You got it in ${guessesSoFar.length} ${guessPlural}!`;

    let modalBodyText = `${topText}<br>${bottomText}`;
    document.getElementById(VICTORY_MODAL_BODY_ID).innerHTML = modalBodyText;

    VICTORY_MODAL.show();

}

function updateGuesses() {
    let reversedGuesses = guessesSoFar.slice().reverse();
    let correctLowercase = correctAnswer.map(word => word.toLowerCase());

    let outputString = "";

    reversedGuesses.forEach(guess => {
        let guessLowercase = guess.split(" ").map(w => w.toLowerCase());
        
        let guessResult = "";
        for (let i = 0; i < guessLowercase.length; i++) {
            let guessWord = guess.split(" ")[i];
            if (guessLowercase[i] === correctLowercase[i]) {
                guessResult += `<span class="correct-pos">${guessWord}</span> `;
                if (!correctWordIndices.includes(i)) {
                    correctWordIndices.push(i);
                }
            }
            else if (correctLowercase.includes(guessLowercase[i])) {
                guessResult += `<span class="incorrect-pos">${guessWord}</span> `;
            }
            else {
                guessResult += `${guessWord} `;
            }
        }
        guessResult.trim();
        outputString += `${guessResult}<br>`;
    });
    
    document.getElementById(PREVIOUS_GUESSES_ID).innerHTML = outputString;
}

function submitAnswer() {
    let answer = document.getElementById(PLAYER_GUESS_ID).value;
    console.log(`Submitting answer: ${answer}`);

    // Add the player guess to the list of guesses
    guessesSoFar.push(answer);

    // Split the answer into individual words
    let answerWords = answer.split(" ");
    answerWords.forEach(word => {
        wordsGuessed.push(word.toLowerCase());
    });

    // Clear the player guess text box
    document.getElementById(PLAYER_GUESS_ID).value = "";

    updateGuesses();
    updateCorrectAnswer();
}

updateCorrectAnswer();