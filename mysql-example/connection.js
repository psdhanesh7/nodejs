const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : 'dhanesh',
    password : 'Welcome7@',
    database : 'MySQL-Example',
    multipleStatements : true
})

mysqlConnection.connect( (err) => {
    if (!err) {
        console.log('Connected');
    } else {
        console.log('Connection failed');
    }
})

module.exports = mysqlConnection;