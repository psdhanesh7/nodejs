require('./models/User');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRouter = require('./routes/authRoutes');

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

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/', authRouter);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Connected to port 3000');
})