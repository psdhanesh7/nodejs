const pool = require('../../config/database');

module.exports = {
    create : (data, callback) => {
        let sql = `INSERT INTO registration(firstName, lastName, gender, email, password, number) VALUES(?, ?, ?, ?, ?, ?)`;
        let values = [data.first_name, data.last_name, data.gender, data.email, data.password, data.number ];

        pool.query(sql, values, (err, rows, fields) => {
            if(err) {
                callback(err);
                return ;
            }
            return callback(null, results);
        });
    }
}