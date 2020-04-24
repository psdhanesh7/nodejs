const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    getLoginPage : (req, res) => {
        res.render('login.ejs');
    },

    loginUser : (req, res) => {
        let userName = req.body.userName;
        let password = req.body.password;

        let getUserQuery = `SELECT * FROM users WHERE user_name = ? `;
        db.query(getUserQuery, [userName], (err, rows, fields) => {
            if(err) {
                res.status(500).send(err);
                return;
            }

            if(rows.length === 0) {
                res.status(200).json({
                    message : "Username not found !!!"
                });
            }
            
            let user = rows[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if(err) {
                    res.status(300).send(err);
                }
                if(match) {
                    jwt.sign({ userName : user.user_name}, process.env.SECRET_KEY, (err, token) => {
                        if(err) {
                            res.send(err);
                            return;
                        }

                        res.cookie('token', token, {
                            expires: new Date(Date.now() + 1000000000),
                            secure: false, // set to true if your using https
                            httpOnly: true,
                        })
                        
                        res.redirect('/users/' + userName);
                    })
                    
                } else {
                    res.redirect('/login');
                }
            })
            
        })

    },

    getRegisterPage : (req, res) => {
        res.render('register.ejs');
    },

    registerUser : (req, res) => {

        let registerUserQuery = `INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)`
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let age = req.body.age;
        let email = req.body.email;
        let userName = req.body.userName;
        let password = req.body.password;

        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.log(err);
                return;
            }
            password = hash;
            
            let values = [userName, password, firstName, lastName, age, email];
            db.query(registerUserQuery, values, (err, rows, fields) => {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                res.redirect('/login');
            })
        })
    },

    getAllUsers : (req, res) => {
        let getAllUsersQuery = `SELECT first_name, last_name, age, email FROM users`;
        db.query(getAllUsersQuery, (err, rows, fields) => {
            if(err) {
                res.status(300).send(err);
                return;
            }
            res.render('users.ejs', {
                userList : rows,
            })
        })
    },

    getAUser : (req, res) => {
        let getUserQuery = `SELECT first_name, last_name, age, email FROM users WHERE user_name = ?`;
        db.query(getUserQuery, [req.params.id], (err, rows, fields) => {
            if(err) {
                res.status(200).send(err);
                return;
            }
            if(rows.length === 0) {
                res.status(500).send("User not found");
                return;
            }
            let user = rows[0];
            console.log(user);

            res.render('users.ejs', {
                userList : null,
                user : user
            })
        })
    },

    logoutUser : (req, res) => {
        console.log(req.cookies.token);
        req.cookies.token = '';
        res.cookie('token', '', {
            expires: new Date(Date.now() + 1000000000),
            secure: false, // set to true if your using https
            httpOnly: true,
        })
        res.redirect('/login');
    }
}