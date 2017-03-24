var logger = require('./app/logger').logger;
var express = require('express');
var app = express();

var tone = require('./app/tone').tone;

app.listen(3000, function (req, res) {
    console.log("server started");
});

app.use(express.static('public'));

/*routes*/

app.get('/text/:id', function (req, res) {

    console.log(req.params.id);
    function myCallback(retvalue) {
        console.log('received response');
        logger.log(retvalue);
        res.send("ok");
        console.log('response sent to client');
    };
    tone(req.params.id, myCallback);
});

