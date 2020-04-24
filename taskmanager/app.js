// var express = require('express');
// var http = require('http');
// var fs = require('fs');

// var app = express();
// var server = http.createServer(app);


// app.get('/', function(req, res) {
//     res.send('<h1>Express Works</h1>');
// })

// app.get('/tasks', function(req, res) {
//     fs.readFile('./db.json', function(err, data) {
//         var tasks = JSON.parse(data.toString()).tasks;
//         res.json(tasks);
//     })
//     // res.send('<h1>Tasks Works!</h1>');
// })

// server.listen(3000, function() {
//     console.log("Server listening to port 3000");
// });

const express = require('express');
const bodyParser = require('body-parser');

const App = express();
App.use(bodyParser.urlencoded({extended : false}));
App.use(bodyParser.json());

let people = {
    people : [
        {name : "Dhanesh", age : 19},
        {name : "Akash", age : 20}
    ]
}

App.get('/people', function(req, res) {
    res.json(people.people)
})

App.post('/people', function(req, res) {
    console.log(req.body);
    if(req.body && req.body.name) {
        people.people.push({name : req.body.name, age : 21});
    }
    res.json(people);
    res.end();
})

App.listen(3000, function() {
    console.log("Server started");
})