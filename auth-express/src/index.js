require('./models/User');
require('./models/Track');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const trackRouter = require('./routes/trackRouter');


const app = express();

const mongoUri = 'mongodb+srv://psdhanesh7:psdhanesh7@@cluster0.llxb8.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(authRouter);
app.use(trackRouter);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Connected to port 3000');
})