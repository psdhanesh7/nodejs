const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    var drinks = [
        { name : 'Bloody Mary', drunkness : 3 },
        { name : 'Martini', drunkness : 5 },
        { name : 'Scotch', drunkness : 10 }
    ]

    var tagLine = 'This is a tagline';

    res.render('./pages/index', {
        drinks : drinks,
        tagLine : tagLine
    });
});

app.listen(3000, (err) => {
    console.log('Server running...');
    console.log('Listening to port 3000');
})