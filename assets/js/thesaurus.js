
class Thesarus {
    constructor(apiKey)
    {
        this.key = apiKey
    }

    getSynonyms(word, callback)
    {
        let getSynsCallback = (request) => {
            // console.log(request);
            if (request.readyState != 4 || request.status != 200 || request.responseText == "")
            {
                if (callback) callback([]);
                return;
            }
            const jsonified = JSON.parse(request.responseText);

            // This gets us the list of synonyms
            const synonyms = jsonified[0]['meta']['syns'].flat();

            // Now let's call the callback with the synonyms
            if (callback) callback(synonyms);
        };

        this.getInfo(word, getSynsCallback);
    }

    getInfo(word, callback)
    {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            callback(xmlHttp);
        }

        let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${this.key}`;
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }
}