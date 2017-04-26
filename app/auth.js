var mysql = require('mysql');
var conn  = mysql.createConnection({
    host: 'localhost',
    database: 'moodmonk',
    user: 'root',
    password: 'password'
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