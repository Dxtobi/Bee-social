const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const NotificationSchema = new Schema({
  user:{
      type: Schema.Types.ObjectId,
      ref: "users"
  },
  message: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  avatar:{
    type: String,
  },
  seen: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

module.exports = Notification = mongoose.model('Notifications',  NotificationSchema );
