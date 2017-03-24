var request = require('request');
var r = request.defaults({ 'proxy': 'http://172.31.1.6:8080/' });

var google = require('googleapis');
google.options({ proxy: 'http://172.31.1.6:8080/' });

var youtube = google.youtube({ version: 'v3', auth: 'AIzaSyAoN1RLSoqgf7ujPK-2cfT8pz4qQR1_tvg' });

var recommend = function (emotion) {
    var feel, quote, act, vid;
    var firstDone = false, secondDone = false;

    if (emotion == "anger") { feel = "love"; }
    else if (emotion == "disgust") { feel = "art"; }
    else if (emotion == "fear") { feel = "management"; }
    else if (emotion == "joy") { feel = "life"; }
    else if (emotion == "sadness") { feel = "funny"; }
    //retrieving quotes
    r('http://quotes.rest/qod.json?category=' + feel, function (error, response, body) {
    
        json = JSON.parse(body);
        console.log(json);
        firstDone = true;
        //quote = json.contents.quotes[0].quote; // quote
        //console.log(quote);
    });
    //retrieving videos
    var results = youtube.search.list({ part: 'id,snippet', q: feel, maxResults: 25 });
    x = results.url.href;
    console.log('asdfadfsadfadsf');
    request({ url: x, json: true, proxy: 'http://172.31.1.6:8080/' }, function (err, localres, json) {
        
        if (err) {
            throw err;
        }
            vid = "https://www.youtube.com/watch?v=" + json.items[0].id.videoId;
            console.log(vid);
            secondDone = true;
    });
    
    //retrieving activities
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
        default:
            act = "asdsad";
    }
    console.log(act);
    console.log(firstDone);
    console.log(secondDone);
    
    while(firstDone == false || secondDone == false);
    console.log(firstDone);
    console.log(secondDone);
    
    var values = [];
    values.push(quote);
    values.push(act);   
    values.push(vid);
    return(values)

}



var a = recommend('fear'); 
console.log(a);
module.exports = { recommend }
