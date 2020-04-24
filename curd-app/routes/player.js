module.exports = {
    addPlayerPage : (req, res) => {
        res.render('add-player.ejs', {
            title : 'Welcome to socka'  | 'Add a new player',
            message : ''
        });
    },

    addPlayer : (req, res) => {
        // console.log(req.files);
        if(!req.files) {
            res.status(400).send('No files were uploaded');
            return ;
        }

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `players` WHERE user_name = ?";
        db.query(usernameQuery,[username], (err, rows, fields) => {
            if(err) {
                res.status(500).send(err);
                return;
            }

            if(rows.length > 0) {
                message = 'Username already exists';
                res.render('add-player.ejs', {
                    message,
                    title: 'Welcome to Socka' | 'Add a new player'
                })
            } else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if(err) {
                            res.status(500).send(err);
                            return;
                        }
                    });

                    let insertQuery = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                    first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";

                    db.query(insertQuery, (err, rows, fields) => {
                        if(err) {
                            res.status(500).send(err);
                            return;
                        }
                        res.redirect('/');
                    })
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: 'Welcome to Socka' | 'Add a new player'
                    });
                }
            }


        });

        
    },

    editPlayerPage : (req, res) => {
        let playerId = req.params.id;
        console.log(playerId);
        const getPlayerQuery = "SELECT * FROM `players` WHERE id = ?";
        db.query(getPlayerQuery, [playerId], (err, rows, fields) => {
            if(err) {
                res.status(500).send(err);
                return;
            }

            res.render('edit-player.ejs', {
                title : 'Edit Player',
                player : rows[0],
                message : ''
            });
        });
    },

    editPlayer : (req, res) => {

        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let editQuery = "UPDATE `players` SET `first_name` = ?, `last_name` = ?, `position` = ?, `number` = ? WHERE `players`.`id` = ?";
        let values = [ first_name, last_name, position, number, playerId ];
        db.query(editQuery, values, (err, rows, fields) => {
            if(err) {
                res.status(500).send(err);
                return;
            }
            res.redirect('/');
        })
    }
}