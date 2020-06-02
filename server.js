const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require('path');
const passport = require('passport');
const notification = require("./routes/api/notification");
const User = require('./models/User');
const Tags = require('./models/Tags')
const users = require('./routes/api/users');
const posts = require('./routes/api/posts')(io);
const groupRoute = require("./routes/api/group")(io);
const searchRoute = require("./routes/api/search");
const conversation = require("./routes/api/conversation")(io);
const bcrypt = require( 'bcryptjs' );
//db config
const db = require('./config/keys').mongoURI;
mongoose.set('useFindAndModify', false)
//db connection
mongoose
    .connect(db, {useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true})
    .then(async () => {
      try {


        // you can refer here any other method to get count or number of record
        let count = await User.countDocuments({});

        if(count <= 0) {
            var user = {
                firstname: "Dxadmin",
                email: "admin@gmail.com",
                password: "jummy16snip",
                handle:'tobi',
                userTypeAdmin:true,
                secondname:'joseph'
            }
            bcrypt.genSalt( 10, ( err, salt ) => {
              bcrypt.hash( user.password, salt, async ( err, hash ) => {
                  if( err ) throw err;
                  user.password = hash;
                  const admin = new User(user);
                 await admin.save().then(c => console.log('created new user =>>>>admin')).catch( err => console.log( err ) );
              })
          })
           
        }

        let countTags = await Tags.countDocuments({});

        if(countTags <= 0) {

            const tags =  'love';

            Tags.insertMany({name : tags})
            .then(function(dos) {
             // console.log('saved tags', dos)
            })
            .catch(function(err) {
              console.log('errror', err)
            });
        }

    } catch (err) {

        console.log(err);
    }
      console.log('MongoDb connected')
    })
    .catch(err => console.log(err));



//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use('/upload' , express.static(path.join(__dirname , '/upload')));

//seting soket 

//notification realtime
// Realtime
const Notifications = require("./realtime/Notification");
const notifications = new Notifications(io);

app.use(function(req, res, next) {
  req.notification = notifications;
  next();
});

//app.set('socketio', io);

//passport strategy
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
//middleware

app.use('/api/users', users);
app.use('/api/profile', users);
app.use("/api/search", searchRoute);
app.use("/api/conversation", conversation);
app.use('/api/posts', posts);
app.use("/api/notification", notification);
app.use("/api/group", groupRoute);


const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port: ${port}`));

