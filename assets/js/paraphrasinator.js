var thes = new Thesarus("6227952c-e37d-42a6-b116-725d4d99d58e");

var targetLength = 0;
var newListOfWords = [];

function paraphrasinate()
{
    const inputText = document.getElementById("inputText").value;

    // Split input into array of words
    const listOfWords = inputText.split(' ');
    targetLength = listOfWords.length;

    // Create new empty list of words
    newListOfWords = [];


    // Originality
    const originality = parseFloat(document.getElementById("originalitySlider").value) / 100.0;

    for (let i = 0; i < listOfWords.length; i++) {
        const raw_word = listOfWords[i];

        // strip punctuation
        let word = raw_word.toLowerCase();
        word = word.replace(/[^\w]|_/g, '');

        // In some cases, keep the original word verbatim
        if (mcw.includes(word) || Math.random() > originality) {

            // Add punctuation and stuff back
            word = refixWord(raw_word, word);

            newListOfWords[i] = word;
            checkIfDone();
            continue;
        }

        // Let's get the synonym for this word
        let synCallback = (synonyms) => {
            if (synonyms.length == 0)
            {
                newListOfWords[i] = word;
            }
            else
            {

                // Choose a random synonym
                const synIndex = Math.floor(Math.random() * synonyms.length);
                let syn = synonyms[synIndex];
                console.log(raw_word + " -> " + syn);

                // Add punctuation and stuff back
                syn = refixWord(raw_word, syn);

                // Add the synonym to the array
                newListOfWords[i] = syn;

                // Check to see if we've hit the target number of words; if so, print out result
                checkIfDone();
            }
        };

        thes.getSynonyms(word, synCallback);
    }
}

function refixWord(originalWord, newWord)
{
    // Replace the punctuation
    let lastCharacter = originalWord.charAt(originalWord.length - 1);
    if ((/[^\w]/g).test(lastCharacter))
    {
        newWord = newWord + lastCharacter
    }

    // Replace capitalization
    let firstCharacter = originalWord.charAt(0);
    console.log(firstCharacter);
    if ((/[A-Z]/g).test(firstCharacter))
    {
        newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }

    return newWord;
}

function checkIfDone()
{
    if (newListOfWords.length == targetLength)
    {
        const output = newListOfWords.join(' ');
        displayParaphrasinatedText(output);
    }
}
function displayParaphrasinatedText(text)
{
    document.getElementById('resultsDisplay').innerText = text;
}