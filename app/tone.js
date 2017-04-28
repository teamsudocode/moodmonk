var request = require('request');
var http_proxy = require(__dirname+'/../config.json').http_proxy;
var r = request.defaults({'proxy': http_proxy});

var headers = {
    'Content-Type': 'application/json'
};

var dataString = '{"text": "A word is dead when it is said, some say. Emily Dickinson"}';

var options = {
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19',
    method: 'POST',
    headers: headers,
    body: dataString,
    auth: {
        "username": "61cfe4bf-f799-479c-b2a2-54e7085cadfd",
        "pass": "LmGeondUno35"
    }
};

var tone = function(text, mycallback) {
    options.body = '{"text": "' + text + '"}';
    r(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('requests successful');
            mycallback(JSON.parse(response.toJSON().body));
        } else {
            console.log('response failed');
        }
    });
};


module.exports = { tone };
