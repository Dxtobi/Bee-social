const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema({
  message:{
    text: { 
        type:String, //match: /*/^[A-Z0-9_-\s]*$/g*/ 
         },
      
    media:[
      
    ]
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    users:[ {type:mongoose.Schema.Types.ObjectId, ref:'users', required:true }
    ],
    sender: { type:mongoose.Schema.Types.ObjectId, ref:'users', required:true },
    date: {
      type: Date,
      default: Date.now
  },
  seen: {
    type: Boolean,
    default:false
  },
  },
  {
    timestamps: true
  });


module.exports = mongoose.model(
  "Message",
  MessageSchema,
  "Message"
);
