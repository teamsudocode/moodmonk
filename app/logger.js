var data = require("../data/data.json")
var fs = require("fs");

function logger(json){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    today = dd+'/'+mm+'/'+yyyy;
    if (!data.hasOwnProperty(today)){
        data[today] = json;
    }
    else {
        increment_day(today, json);
    }
    fs.writeFile("../data/data.json", JSON.stringify(data), "utf8");
}

function incrementDay(today, json){
}
function dominantEmotion(json){
    var max = 0.0;
    var dominant_emotion = '';
    var emotions =json["document_tone"]["tone_categories"][0]["tones"]; 
    for (var emotion in emotions){
        if (emotions[emotion].score > max){
            max = emotions[emotion].score;
            dominant_emotion = emotions[emotion].tone_id;
        }
    }
    return dominant_emotion;
}

function analyzer(data){
    var emotions = ['anger', 'disgust', 'fear', 'sadness', 'joy']
    for (var i in data){
    }
}
