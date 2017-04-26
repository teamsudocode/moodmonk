'use strict';

var logger = require('./app/logger').logger;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var md5 = require('md5');
var cookieParser = require('cookie-parser');


var tone = require('./app/tone').tone;
var recommend = require('./app/recommend');
var auth = require('./app/auth');

var session = {};

function getRandomKey(username) {
    let d = new Date();
    return md5(d.getTime() + username);
}

function sessionExists(username) {
    let exists = false;
    for (let key in session) {
        if (session[key] === username)
            return true;
    }
    return exists;
}

function isLoggedIn(sessionId) {
    return session[sessionId] !== undefined;
}

function getUserName(sessionId) {
    return session[sessionId];
}

app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname+'/public');

app.listen(3000, function (req, res) {
    console.log("server started");
});

app.use(express.static('public'));

/*routes*/

app.get(['/', '/index.html'], function(req, res) {
    res.render('main.html', { loggedIn: isLoggedIn(req.cookies.sessionId), failed: false });
    // if (isLoggedIn(req.cookies.sessionId))
    //     res.sendFile(__dirname+'/public/main.html');
    // else
    //     res.send('fuckoff');
});

var sampleJson = require('./response.json');
app.get('/askWatson/:query', function (req, res) {

    if (isLoggedIn(req.cookies.sessionId) == false) {
        res.send('not logged in');
    }

    console.log(req.params.query);
    function myCallback(retvalue) {
        // console.log('received response');
        logger.log(session[req.cookies.sessionId], retvalue);
        res.send(logger.dominantEmotion(retvalue));
        console.log('response sent to client');
    };
    tone(req.params.query, myCallback);
    myCallback(sampleJson);
});

app.get('/logger/day/:date', function (req, res) {
    logger.getByDate(session[req.cookies.sessionId], req.params.date, (json) => {
        // console.log('sending back', json);
        console.log("/logger/date/:date : sending data to client");
        res.send(json);
    });
    // res.send(logger.getByDate(req.params.date));
});

app.get('/logger/range/:from/:to', function (req, res) {
    // logger.getBetweenDates(session[req.cookies.sessionId], req.params.from, req.params.to, res.send);
    logger.getBetweenDates(session[req.cookies.sessionId], req.params.from, req.params.to, function(json) {
        console.log("/logger for range : sending data to client");
        res.send(json);
    });
});

app.get('/recommend/:what/:expression', function (req, res) {
    // overriding recommendations due to missing api keys
    res.send(200);
    return;

    function customCallback(text) {
        res.send(text);
    }
    switch(req.params.what) {
        case 'video':    recommend.getVideo(req.params.expression, customCallback);      break;
        case 'activity': recommend.getActivities(req.params.expression, customCallback); break;
        case 'quote':    recommend.getQuotes(req.params.expression, customCallback);     break;
        case 'test':     recommend.test(req.params.expression, customCallback);     break;
        default :        res.send('invalid');
    }
});

app.post('/signup', function(req, res) {
    let failCheck = true;
    auth.signup(req.body.userid, req.body.password, (status) => {
        if (status)
            res.redirect('/');
        else
            res.send({
                "error": "User already exists"
            });
    })
});

app.post('/login', function(req, res) {
    // assuming ok username and password
    let failCheck = true;
    if (!sessionExists(req.body.userid)) {
        auth.login(req.body.userid, req.body.password, (status) => {
            console.log('login status: ' + status);
            if (status) {
                let sessionId = getRandomKey(req.body.userid);
                session[sessionId] = req.body.userid;
                res.cookie('sessionId', sessionId, { expire: 3600+Date.now() });
                res.render('main.html', { loggedIn: true, failed: !status });
            } else {
                res.render('main.html', { loggedIn: false, failed: true });
            }
        });
    }
});

app.get('/logout', function(req, res) {
    // assuming ok username and password
    if (req.cookies.sessionId !== 'undefined') {
        delete session[req.cookies.sessionId];
        res.clearCookie('sessionId');
    }
    res.render('main.html', { loggedIn: isLoggedIn(req.cookies.sessionId), failed: false });
});