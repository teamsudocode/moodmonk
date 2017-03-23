var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    url: "https://gateway.watsonplatform.net/tone-analyzer/api",
    username: "f4dc0523-93cd-445a-8bda-34396663adba",
    password: "z3MgWVkuEvOd",
    version_date: '2016-05-19'
});

function tone(text, myCallback){
    console.log('inside tone');
    tone_analyzer.tone({ text: text }, function (err, tone) {
        if (err) {
            console.log('error occured in tone');
            return (err);
        }
        else
            myCallback(JSON.stringify(tone, null , 2));
    });
}

module.exports = { tone }
