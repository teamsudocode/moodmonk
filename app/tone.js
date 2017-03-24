var request = require('request');
var r = request.defaults({'proxy': 'http://172.31.1.6:8080/'});

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
        'username' : "f4dc0523-93cd-445a-8bda-34396663adba",
        'pass': 'z3MgWVkuEvOd'
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
