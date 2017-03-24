var logger = require('./app/logger').logger;
var express = require('express');
var app = express();

var tone = require('./app/tone').tone;
var recommend = require('./app/recommend');

app.listen(3000, function (req, res) {
    console.log("server started");
});

app.use(express.static('public'));

/*routes*/

app.get('/askWatson/:query', function (req, res) {

    console.log(req.params.query);
    function myCallback(retvalue) {
        console.log('received response');
        logger.log(retvalue);
        res.send(logger.dominantEmotion(retvalue));
        console.log('response sent to client');
    };
    tone(req.params.query, myCallback);
});

app.get('/logger/day/:date', function (req, res) {
    res.send(logger.getByDate(req.params.date));
});

app.get('/recommend/:what/:expression', function (req, res) {

    function customCallback(text) {
        res.send(text);
    }
    switch(req.params.what) {
        case 'video':    recommend.getVideo(req.params.expression, customCallback);      break;
        case 'activity': recommend.getActivities(req.params.expression, customCallback); break;
        case 'quote':    recommend.getQuotes(req.params.expression, customCallback);     break;
        case 'test':    recommend.test(req.params.expression, customCallback);     break;
        default :        res.send('invalid');
    }

});