const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'dhanesh',
    password : 'Welcome7@',
    database : 'authentication'
});

db.connect((err) => {
    console.log("Connected to database successfully");
});

module.exports = db;