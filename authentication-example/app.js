const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./api/users/user.router');


const {} = require('dotenv').config();

const app = express();

app.use('/api/users', userRouter);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended : true }));


app.listen(process.env.PORT, (err) => {
    if(!err) {
        console.log('Server running');
        console.log('Listening to port ' + process.env.PORT);
    } else {
        console.log(err);
    }
})