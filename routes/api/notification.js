const router = require("express").Router();
const passport = require( 'passport' );
const Notifications = require('../../models/notification')
const Notification = require("../../realtime/Notification");
//const  passport.authenticate( 'jwt', { session: false } ), = require("../../middleware/ passport.authenticate( 'jwt', { session: false } ),");

const User = require("../../models/User");
//const LoggedInUser = require("../../models/LoggedInUsers");

// @route   POST api/notification/join
// @desc    Add log in user to notificaiton
// @access  POST
router.post("/join",  passport.authenticate( 'jwt', { session: false } ), (req, res) => {
  Notification.joinNotification({
    userId: req.user._id,
    socketId: req.body.socketId
  });
  res.status(200);
});

// @route   GET api/notification/get-notifications
// @desc    get notification of a logged in user
// @access  GET
router.get("/get-notifications", passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    
    const notifications = await Notifications.find({user: req.user.id})
      .lean()
      .exec();
   //console.log(notifications, req.user.handle)
    res.status(200).json({
      notifications: notifications,
    });
  } catch (err) {
    throw err;
  }
});

// @route   GET api/notification/seen-notifications
// @desc    get notification of a logged in user
// @access  GET
router.patch("/seen-notifications/:id", passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {

      Notifications.findById(req.params.id).then(nf=>{
        nf.seen = true
        nf.save().then(nfs=>{
          console.log('seen')
          res.status(200);
        })
      })
      
  // console.log(user)
   
  } catch (err) {
    throw err;
  }
});
// @route   DELETE api/notification/:id
// @desc    get notification of a logged in user
// @access  DELETE
router.delete("/deletenotifications/:id",  passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
      Notifications.findOneAndDelete(req.params.id).then(()=>{
         return res.status(200).send({});
      })
  } catch (err) {
    throw err;
  }
});

// /api/testing/message/:id
router.post("/message/:id",  passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    const toUser = await User.findById(req.params.id);
    const fromUser = await User.findById(req.user._id);
    const toUserId = await LoggedInUser.findOne({ userId: req.params.id });
    const fromUserId = await LoggedInUser.findOne({ userId: req.user._id });

    req.notification.sendMessage(req.body.message, {
      fromName: fromUser.email,
      toName: toUser.email,
      fromSocketId: fromUserId.socketId,
      toSocketId: toUserId.socketId
    });
    res.send({ msg: "Success" });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
