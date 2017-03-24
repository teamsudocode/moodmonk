// const anondataFile = '../data/anonymous.json';
// const dataFileName = '../data/data.json';
const dataFileName = "../data/data.json";

var data = require(dataFileName);
var fs = require("fs");

function getDateKey() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    return mm+'-'+dd+'-'+yyyy;
}

function log(json) {
    console.log('data' + JSON.stringify(data));
    let key = getDateKey();
    if (!data.hasOwnProperty(key)) {
        data[key] = json;
        console.log(data);
        fs.writeFile(dataFileName, JSON.stringify(data), "utf8", () => {
            console.log("data updated");
        });
    } else {
        incrementDay(key, json);
    }
}

function incrementDay(key, json) {
    /* assumed that this function is invoked only when
     an object for same day exist
     */
    let toneCategories = json.document_tone.tone_categories;
    // console.log(JSON.stringify(data));
    for (let i = 0; i < toneCategories.length; i++) {
        for (let j = 0; j < toneCategories[i].tones.length; j++) {
            data[key].document_tone.tone_categories[i].tones[j].score +=
                json.document_tone.tone_categories[i].tones[j].score;
        }
    }
    // console.log(JSON.stringify(data));
    fs.writeFile(dataFileName, JSON.stringify(data), "utf8", () => {
        console.log('data updated by incrementing');
    });
}

function dominantEmotion(json){
    let max = 0.0;
    let dominant_emotion = '';
    let emotions =json["document_tone"]["tone_categories"][0]["tones"];
    for (let emotion in emotions){
        if (emotions[emotion].score > max){
            max = emotions[emotion].score;
            dominant_emotion = emotions[emotion].tone_id;
        }
    }
    return dominant_emotion;
}

function getDataByDate(date) {
    console.log("finding by date" + date);
    if (!data.hasOwnProperty(date)) {
        return "404";
    }
    let json = data[date];
    let retvalue = {
        "emotion_tone": {
            "anger": json.document_tone.tone_categories[0].tones[0].score,
            "disgust": json.document_tone.tone_categories[0].tones[1].score,
            "fear": json.document_tone.tone_categories[0].tones[2].score,
            "sadness": json.document_tone.tone_categories[0].tones[3].score,
            "joy": json.document_tone.tone_categories[0].tones[4].score
        },
        "language_tone": {
            "analytical": json.document_tone.tone_categories[1].tones[0].score,
            "confident": json.document_tone.tone_categories[1].tones[1].score,
            "tentative": json.document_tone.tone_categories[1].tones[2].score
        },
        "social_tone": {
            "openness": json.document_tone.tone_categories[2].tones[0].score,
            "conscientiousness": json.document_tone.tone_categories[2].tones[1].score,
            "extraversion": json.document_tone.tone_categories[2].tones[2].score,
            "agreableness": json.document_tone.tone_categories[2].tones[3].score,
            "emotional_range": json.document_tone.tone_categories[2].tones[4].score
        }
    };
    return retvalue;
}

function analyzer(data){
    let emotions = ['anger', 'disgust', 'fear', 'sadness', 'joy'];
    for (let i in data){
    }
}

var logger = {
    'analyzer': analyzer,
    'dominantEmotion': dominantEmotion,
    'log': log,
    'getByDate': getDataByDate
};

module.exports = { logger };
