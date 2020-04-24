module.exports = {
    getHomePage : (req, res) => {
        let query = 'SELECT * FROM players ORDER BY id ASC';
        db.query(query, (err, rows, fields) => {
            if (err) {
                res.redirect('/');
            }
            
            res.render('index.ejs', {
                title : 'Welcome to socka' | 'View players',
                players : rows
            });
        });
    }
}