'use strict';
var defaultJson = require(__dirname+'/../response.json');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'moodmonk'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

var emotionTemplate = {
"tones": [
        {
        "score": 0.00,
        "tone_id": "anger",
        "tone_name": "Anger"
        },
        {
        "score": 0.00,
        "tone_id": "disgust",
        "tone_name": "Disgust"
        },
        {
        "score": 0.00,
        "tone_id": "fear",
        "tone_name": "Fear"
        },
        {
        "score": 0.00,
        "tone_id": "joy",
        "tone_name": "Joy"
        },
        {
        "score": 0.00,
        "tone_id": "sadness",
        "tone_name": "Sadness"
        }
    ],
    "category_id": "emotion_tone",
    "category_name": "Emotion Tone"
};

var languageTemplate = {
        "tones": [
          {
            "score": 0.00,
            "tone_id": "analytical",
            "tone_name": "Analytical"
          },
          {
            "score": 0.00,
            "tone_id": "confident",
            "tone_name": "Confident"
          },
          {
            "score": 0.00,
            "tone_id": "tentative",
            "tone_name": "Tentative"
          }
        ],
        "category_id": "language_tone",
        "category_name": "Language Tone"
};

var socialTemplate = {
        "tones": [
          {
            "score": 0.00,
            "tone_id": "openness_big5",
            "tone_name": "Openness"
          },
          {
            "score": 0.00,
            "tone_id": "conscientiousness_big5",
            "tone_name": "Conscientiousness"
          },
          {
            "score": 0.00,
            "tone_id": "extraversion_big5",
            "tone_name": "Extraversion"
          },
          {
            "score": 0.00,
            "tone_id": "agreeableness_big5",
            "tone_name": "Agreeableness"
          },
          {
            "score": 0.00,
            "tone_id": "emotional_range_big5",
            "tone_name": "Emotional Range"
          }
        ],
        "category_id": "social_tone",
        "category_name": "Social Tone"
};

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function setEmotionTone(jsonobject, callback) {
    connection.query('INSERT INTO emotion_tone SET ?', jsonobject ,function (err, rows, fields) {
        if (err)
            callback(false);
        console.log('Inserted in EmotionTone Table');
        callback(true);
    });
};

function setLanguageTone(jsonobject, callback) {
    connection.query('INSERT INTO language_tone SET ?', jsonobject ,function (err, rows, fields) {
        if (err)
            callback(false);
        console.log('Inserted in LanguageTone Table');
        callback(true);
    });
};

function setSocialTone(jsonobject, callback) {
    connection.query('INSERT INTO social_tone SET ?', jsonobject ,function (err, rows, fields) {
        if (err)
            callback(false);
        console.log('Inserted in SocialTone Table');
        callback(true);
    });
};


function getEmotionTone(Userid, Date, callback) {
    connection.query('SELECT * FROM emotion_tone WHERE userid = ? AND date = ?', [ Userid, Date] ,function (err, rows, fields) {
        if (err)
            callback(defaultJson.document_tone.tone_categories[0]);
        let x = clone(emotionTemplate);
        for (let i = 0; i < rows.length; i++) {
            x.tones[0].score += rows[i].anger;
            x.tones[1].score += rows[i].disgust;
            x.tones[2].score += rows[i].fear;
            x.tones[3].score += rows[i].joy;
            x.tones[4].score += rows[i].sadness;
        }
        console.log(x);
        callback(x);
    });
};

function getLanguageTone(Userid, Date, callback) {
    connection.query('SELECT * FROM language_tone WHERE userid = ? AND date = ?', [ Userid, Date] ,function (err, rows, fields) {
        if (err)
            callback(defaultJson.document_tone.tone_categories[0]);
        let x = clone(languageTemplate);
        for (let i = 0; i < rows.length; i++) {
                x.tones[0].score += rows[i].analytical;
                x.tones[1].score += rows[i].confident;
                x.tones[2].score += rows[i].tentative;
        }
        console.log(x);
        callback(x);
    });
};

function getSocialTone(Userid, Date, callback) {
    connection.query('SELECT * FROM social_tone WHERE userid = ? AND date = ?', [ Userid, Date] ,function (err, rows, fields) {
        if (err)
            callback(defaultJson.document_tone.tone_categories[0]);
        let x = clone(socialTemplate);
        for (let i = 0; i < rows.length; i++) {
            x.tones[0].score += rows[i].openness_big5;
            x.tones[1].score += rows[i].conscientiousness_big5;
            x.tones[2].score += rows[i].extraversion_big5;
            x.tones[3].score += rows[i].agreeableness_big5;
            x.tones[4].score += rows[i].emotional_range_big5;
        }
        console.log(x);
        callback(x);
    });
};

function stopApp() {
    connection.end();
}

module.exports = {
    getEmotionTone,
    getLanguageTone,
    getSocialTone,
    setEmotionTone,
    setLanguageTone,
    setSocialTone,
    stopApp
};
