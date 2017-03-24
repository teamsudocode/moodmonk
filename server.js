var logger = require('./app/logger').logger;
var express = require('express');
var app = express();

var tone = require('./app/tone').tone;
// var recommend = require('./app/recommend').recommend;

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

app.get('/logger/range/:from/:to', function (req, res) {
    res.send(logger.getBetweenDates(req.params.from, req.params.to));
});

/*app.get('/recommend/:id', function (req, res) {

    console.log(req.params.id);
    function myCallback(retvalue) {
        console.log("inside callback" + retvalue);
    };
    recommend(req.params.id, myCallback);
});*/
