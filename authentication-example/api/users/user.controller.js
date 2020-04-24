const { create } = require('./user.service');

const { genSaltSync, hashSync } = require('bcrypt');

module.exports = {
    createUser : (req, res) => {
        console.log(req.body);
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
                return;
            }

            res.status(200).json({
                success : 1,
                data : results
            });
            return;
        })
    }
}