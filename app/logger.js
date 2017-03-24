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
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return dd+'/'+mm+'/'+yyyy;
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

function analyzer(data){
    let emotions = ['anger', 'disgust', 'fear', 'sadness', 'joy'];
    for (let i in data){
    }
}

var logger = {
    'analyzer': analyzer,
    'dominantEmotion': dominantEmotion,
    'log': log
};

module.exports = { logger };
