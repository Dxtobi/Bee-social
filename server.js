const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//db connection
mongoose
    .connect(db)
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

//middleware

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

