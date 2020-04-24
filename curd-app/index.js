const express = require('express');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const { getHomePage } = require('./routes/index');
const { addPlayerPage, addPlayer, editPlayerPage, editPlayer } = require('./routes/player');

const app = express();

// Configure the middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'dhanesh',
    password : 'Welcome7@',
    database : 'socka',
});

db.connect((err) => {
    if (!err) {
        console.log('Connected to Database successfully');
    } else {
        console.log(err);
    }
});

global.db = db;

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.post('/add', addPlayer);
app.get('/edit/:id', editPlayerPage);
app.post('/edit/:id', editPlayer);


app.listen(5000, (err) => {
    console.log("Server started");
    console.log("Listening to port 3000");
})