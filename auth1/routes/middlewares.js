require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken : (req, res, next) => {
        let token = req.cookies.token;
        console.log(token);
        if(!token) {

            res.redirect('/login');
            return;
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(300).send(err);
                return;
            }

            console.log(decoded);
            next();
        })
    },

    verifyUser : (req, res, next) => {
        let token = req.cookies.token;
        if(!token) {
            res.redirect('/login');
            return;
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(300).send(err);
                return;
            }
            console.log(decoded.userName);
            console.log(req.params.id);
            if(decoded.userName === req.params.id) {
                next();
                return;
            } else {
                res.json({
                    message : "You don't have permission"
                })
            }
        })
    },

    checkLogin : (req, res, next) => {
        let token = req.cookies.token;
        if(!token) {
            next();
            return;
        } else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err) {
                    res.status(300).send(err);
                    return;
                }

                res.redirect('/users/' + decoded.userName);
            })
        }
    }
}