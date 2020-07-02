const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Note that jwt part is not done so far

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hi there!');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
    
        res.send('You created a new user');
    } catch (err) {
        return res.status(422).send(err.message);
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(422).send({error : 'Must provide email and password'});
    } 

    const user = await User.findOne({ email : email });
    if(!user) return res.status(404).send({ error : 'Invalid password or email' });

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId : user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch(err) {
        return res.status(404).send({ error : 'Invalid password or email' });
    }
})

module.exports = router;