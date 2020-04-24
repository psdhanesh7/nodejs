const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const users = [];

const app = express();

app.set(bodyParser.json());
app.set(bodyParser.urlencoded({ extended : true }));
app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {
        name : 'Dhanesh'
    });
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', async(req, res) => {
    let name = req.body.name;
    let password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({
            id : users.length + 1,
            name : name,
            password : hashedPassword
        })
    } catch {

    }
});

app.get('/register', (req, res) => {
    // res.render('register.ejs');
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({
            id : users.length + 1,
            name : name,
            email : email,
            password : hashedPassword
        })
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }

    console.log(users);
})

app.listen(3000, (err) => {
    if(!err) {
        console.log('Server is up and running\nListening to port 3000');
    } else {
        console.log(err);
    }
})