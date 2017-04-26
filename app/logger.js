'use strict';
// const anondataFile = '../data/anonymous.json';
// const dataFileName = '../data/data.json';
const dataFileName = __dirname+"/../data/data.json";

var data = require(dataFileName);
var db = require("./mysqlquery");
var fs = require("fs");

function getDateKey() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    return mm+'-'+dd+'-'+yyyy;
}

// function log(json) {
//     let key = getDateKey();
//     if (!data.hasOwnProperty(key)) {
//         data[key] = json;
//         console.log(data);
//         fs.writeFile(dataFileName, JSON.stringify(data), "utf8", () => {
//             console.log("data updated");
//         });
//     } else {
//         incrementDay(key, json);
//     }
// }

function log(userid, json) {
    db.updateDB(userid, json);
}

// function incrementDay(key, json) {
//     /* assumed that this function is invoked only when
//      an object for same day exist
//      */
//     let toneCategories = json.document_tone.tone_categories;
//     // console.log(JSON.stringify(data));
//     for (let i = 0; i < toneCategories.length; i++) {
//         for (let j = 0; j < toneCategories[i].tones.length; j++) {
//             data[key].document_tone.tone_categories[i].tones[j].score +=
//                 json.document_tone.tone_categories[i].tones[j].score;
//         }
//     }
//     // console.log(JSON.stringify(data));
//     fs.writeFile(dataFileName, JSON.stringify(data), "utf8", () => {
//         console.log('data updated by incrementing');
//     });
// }

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

function getDataByDate(userid, date, callback) {
    db.retrieveData(userid, date, function(json) {
        let retvalue = {
            "emotion_tone": {
                "anger":    json.emotion_tone.tones[0].score,
                "disgust":  json.emotion_tone.tones[1].score,
                "fear":     json.emotion_tone.tones[2].score,
                "sadness":  json.emotion_tone.tones[3].score,
                "joy":      json.emotion_tone.tones[4].score
            },
            "language_tone": {
                "analytical": json.language_tone.tones[0].score,
                "confident":  json.language_tone.tones[1].score,
                "tentative":  json.language_tone.tones[2].score
            },
            "social_tone": {
                "openness":          json.social_tone.tones[0].score,
                "conscientiousness": json.social_tone.tones[1].score,
                "extraversion":      json.social_tone.tones[2].score,
                "agreableness":      json.social_tone.tones[3].score,
                "emotional_range":   json.social_tone.tones[4].score
            }
        };
        callback(retvalue);
    });
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

function getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate);
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function getDataBetweenDates(from, to) {
    let currentJson = null;

    let responseJson = {};
    let dateArray = getDates(new Date(from), new Date(to));

    for (let i = 0; i < dateArray.length; i++) {
        let date = dateArray[i];
        let dateKey = date.getMonth()+1+'-'+date.getDate()+'-'+date.getFullYear();
        let currentJson = getDataByDate(dateKey);
        if (currentJson != '404') {
            responseJson[dateKey] = currentJson;
        }
    }
    return responseJson;
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
    'getByDate': getDataByDate,
    'getBetweenDates': getDataBetweenDates
};

module.exports = { logger };
