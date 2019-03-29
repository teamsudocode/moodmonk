'use strict';
// var logger = require('./app/logger').logger;
var md5     = require('md5');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
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

app.listen(8000, function (req, res) {
    console.log("server started");
});

app.get('/login/:userid', function(req, res) {
    // assuming ok username and password
    if (!sessionExists(req.params.userid)) {
        let sessionId = getRandomKey(req.params.userid);
        session[sessionId] = req.params.userid;
        res.cookie('sessionId', sessionId, { expire: 3600+Date.now() });
    }
    res.send('done');
    console.log(session);
});

app.get('/logout', function(req, res) {
    // assuming ok username and password
    console.log(req.cookies);
    if (req.cookies.sessionId !== 'undefined') {
        delete session[req.cookies.sessionId];
        res.clearCookie('sessionId');
    }
    console.log(session);
    res.send('done');
});
