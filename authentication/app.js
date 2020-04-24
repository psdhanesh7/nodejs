const express = require('express');

const app = express();

// Import routes
const authRoute = require('./routes/auth');


// Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, (err) => {
    if(!err) {
        console.log('Server is running');
        console.log('Listening to port 3000');
    } else {
        console.log(err);
    }
})