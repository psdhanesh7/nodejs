const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

let courses = [
    { id : 1, name : "course1" },
    { id : 2, name : "course2" },
    { id : 3, name : "course3" }
]

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => {
        return c.id === parseInt(req.params.id);
    })
    // res.send(course);
    if(!course) {
        res.status('404').send('The course with the given id was not found');
    } else {
        res.send(course);
    }
})

app.post('/api/courses', (req, res) => {

    const result = validateCourse(req.body);
    console.log(result);

    // if (!req.body.name || req.body.name.length < 3) {
    if (result.error) {
        // 400 bad request
        res.status('400').send(result.error.details[0].message);
        return;
    }
    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If the course doesn't exist return 404
    const course = courses.find((c) => {
        return c.id === parseInt(req.params.id);
    })
    if(!course) {
        res.status('404').send('The course with the given id was not found');
        return ;
    }     


    // Validate 
    // If invalid, return 400 - bad request

    const result = validateCourse(req.body);
    if (result.error) {
        // 400 bad request
        res.status('400').send(result.error.details[0].message);
        return;
    }

    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);

})


// PORT
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Listening on port " + port);
});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required(),
    };
    return Joi.validate(course, schema);
}