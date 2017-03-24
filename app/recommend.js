var request = require('request');
var r = request.defaults({ 'proxy': 'http://172.31.1.6:8080/' });

var google = require('googleapis');
google.options({ proxy: 'http://172.31.1.6:8080/' });

var youtube = google.youtube({ version: 'v3', auth: 'AIzaSyAoN1RLSoqgf7ujPK-2cfT8pz4qQR1_tvg' });

function getQuotes(emotion, callback) {
    //retrieving quotes
    let feel = '';
    if      (emotion == "anger")    { feel = "love";       }
    else if (emotion == "disgust")  { feel = "art";        }
    else if (emotion == "fear")     { feel = "management"; }
    else if (emotion == "joy")      { feel = "life";       }
    else if (emotion == "sadness")  { feel = "funny";      }
    console.log('getting quotes');
    r('http://quotes.rest/qod.json?category=' + feel, function (error, response, body) {
        let json = JSON.parse(body);
        let quote = json.contents.quotes[0].quote; // quote
        callback(quote);
    });
} 

function getVideo(emotion, callback) {
    //retrieving videos
    console.log('getting videos');
    let feel = '';
    if      (emotion == "anger")    { feel = "love";       }
    else if (emotion == "disgust")  { feel = "art";        }
    else if (emotion == "fear")     { feel = "management"; }
    else if (emotion == "joy")      { feel = "life";       }
    else if (emotion == "sadness")  { feel = "funny";      }
    var results = youtube.search.list({ part: 'id,snippet', q: feel, maxResults: 25 });
    x = results.url.href;
    request({ url: x, json: true, proxy: 'http://172.31.1.6:8080/' }, function (err, localres, json) {
        if (err) {
            throw err;
        }
        vid = "https://www.youtube.com/watch?v=" + json.items[0].id.videoId;
        callback(vid);
    });
}

function getActivities(emotion, callback) {
     //retrieving activities
     console.log('getting activities');
    let act = '', feel = '';
    if      (emotion == "anger")    { feel = "love";       }
    else if (emotion == "disgust")  { feel = "art";        }
    else if (emotion == "fear")     { feel = "management"; }
    else if (emotion == "joy")      { feel = "life";       }
    else if (emotion == "sadness")  { feel = "funny";      }
    switch (emotion) {
        case 'anger':
            act = "Go for a jog";
            break;
        case 'disgust':
            act = "Paint a picture";
            break;
        case 'fear':
            act = "Meditate";
            break;
        case 'joy':
            act = "Serve the needy";
            break;
        case 'sadness':
            act = "Dance Dance Dance";
            break;
        default:
            act = "asdsad";
    }
    callback(act);
}

function test(expr, callback) {
    console.log('got ' + expr);
    callback(expr);
}

module.exports = { getVideo, getActivities, getQuotes, test };
