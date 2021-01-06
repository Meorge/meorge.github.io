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


        const randomVal = Math.random()

        // In some cases, keep the original word verbatim
        if (mcw.includes(word) || Math.random() > originality) {
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
                const syn = synonyms[synIndex];

                // Add the synonym to the array
                newListOfWords[i] = syn;

                // TODO: Replace the punctuation

                // TODO: Replace capitalization

                // Check to see if we've hit the target number of words; if so, print out result
                checkIfDone();
            }
        };

        thes.getSynonyms(word, synCallback);
    }
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