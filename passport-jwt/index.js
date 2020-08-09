const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const path = require('path');

require('./models/User');
require('./services/passport');


const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const { authenticatedOnly, unauthenticatedOnly } = require('./middlewares/authMiddileware')


mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DATABASE: Connection to database successful!"))
    .catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'this is really an awesome secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.get('/dashboard', authenticatedOnly, (req, res) => {
    res.send(req.user);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => console.log(`Listening to port ${PORT}`));