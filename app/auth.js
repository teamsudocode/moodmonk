var config = require(__dirname+"/../config.json");

var mysql = require('mysql');
var conn  = mysql.createConnection({
    host: config.mysqlHost,
    database: 'moodmonk',
    user: config.mysqlUser,
    password: config.mysqlPassword
});

function login(userId, password, callback) {
    conn.query(
        "select * from `User` where `userid` = ? and `password` = ?", 
        [ userId, password ], 
        function(err, res, fields) {
            if (err) throw err;
            if (res.length === 0) callback(false);
            if (res.length === 1) callback(true);
        }
    );
}

function signup(userid, password, callback) {
    conn.query(
        "insert into `User` SET ?",
        { "userid": userid, "password": password },
        function(err, res, fields) {
            if (err !== null) {
                if (err.code === "ER_DUP_ENTRY") callback(false);
            }
            else  callback(true);
        }
    );
}

module.exports = { login, signup };