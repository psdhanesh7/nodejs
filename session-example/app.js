const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
    PORT = 3000,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'dhanesh',
    SESS_LIFETIME = TWO_HOURS
} = process.env;

const IN_PROD = NODE_ENV === 'production';

const users = [
    { id : 1, name : 'Alex', email : 'alex@gmail.com', password : 'secret' },
    { id : 2, name : 'Max', email : 'max@gmail.com', password : 'secret' },
    { id : 3, name : 'Hagard', email : 'hagard@gmail.com', password : 'secret' }
]

const app = express();

app.use(session({
    name : SESS_NAME,
    resave : false,
    saveUninitialized : false,
    secret : SESS_SECRET,
    cookie : {
        maxAge : SESS_LIFETIME,
        sameSite : true,
        secure : IN_PROD
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/home');
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    const { userId } = req.session;

    res.send(
        `<h1>Welcome</h1>
        ${ userId ? `
            <a href='home'>Home</a>
            <form method='post' action='/logout'>
                <button >Logout</button>
            </form>
        ` : `
            <a href='/login'>Login</a>
            <a href='/register'>Register</a>
        `}        
    `)
})

app.get('/home', redirectLogin, (req, res) => {
    const user = users.find((user) => {
        return user.id === req.session.userId;
    })
    console.log(user);
    res.send(`
        <h1>Home</h1>
        <a href='/'>Main</a>
        <ul>
            <li>Name : ${user.name}</li>
            <li>Email : ${user.email}</li>
        </ul>
    `)
})

app.get('/login', redirectHome, (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method='post' action='/login'>
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='password' placeholder='Password' required />
            <input type='submit' />
        </form>
        <a href='/register'>Register</a>
    `)
})

app.get('/register', redirectHome, (req, res) => {
    res.send(`
        <div>
            <h1>Register</h1>
            <form method='post' action='/register'>
                <input type='text' name='name' placeholder='Name' required ></input>
                <input type='email' name='email' placeholder='Email' required ></input>
                <input type='password' name='password' placeholder='Password' required ></input>
                <input type='submit' />
            </form>
        </div>
        <div>
            <a href='/login'>Login</a>
        </div>
    `)
})

app.post('/login', redirectHome, (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = users.find((user) => {
            return user.email === email &&  user.password === password;
        })

        if(user) {
            req.session.userId = user.id;
            res.redirect('/home');
            return;
        } 
    }

    res.redirect('/login');

})

app.post('/register', redirectHome, (req, res) => {
    const { email, password, name } = req.body;
        
    if(email && password && name) {
        const exists = users.some((user) => {
            return user.email === email;
        })

        if(!exists) {

        }
        const user = { id : users.length + 1, name : name, email : email, password : password };
        users.push(user);
        
        req.session.id = user.id;
        res.redirect('/home');

        return;
    }
    res.redirect('/redirect');
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.redirect('/home');
            return;
        } else {
            res.redirect('/');
        }
        
    });
    res.clearCookie(SESS_NAME);
});



app.listen(PORT, (err) => {
    if(!err) {
        console.log('Connected to server succesfully');
    } else {
        console.log('Error connecting to the server');
    }
})