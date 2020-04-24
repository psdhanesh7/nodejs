const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { getHomePage } = require('./routes/index');
const { getLoginPage, loginUser, getRegisterPage, registerUser, logoutUser } = require('./routes/users');
const { getAllUsers, getAUser } = require('./routes/users');
const { verifyToken, verifyUser, checkLogin } = require('./routes/middlewares');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', getHomePage);

app.get('/login', checkLogin, getLoginPage);
app.post('/login', loginUser);

app.get('/register', getRegisterPage);
app.post('/register', registerUser);

app.get('/users', verifyToken, getAllUsers);
app.get('/users/:id', verifyToken, verifyUser, getAUser);

app.get('/logout', verifyToken, logoutUser);

app.listen(4000, (err) => {
    if(!err) {
        console.log("Server is running \nListening to port 4000");
    } else {
        console.log(err);
    }
})