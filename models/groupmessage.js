const mongoose = require("mongoose");

const { Schema } = mongoose;

const GroupMsg = new Schema({
  message:{
        text: { type:String  },
        file: { type:String }
        // you can add any other properties to the message here.
        // for example, the message can be an image ! so you need to tweak this a little
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    groupid:{type:mongoose.Schema.Types.ObjectId, ref:'Group', required:true },
    
    sender: { type:mongoose.Schema.Types.ObjectId, ref:'users', required:true },
    
  },
  {
    timestamps: true
  });


module.exports = mongoose.model(
  "GroupMsg",
  GroupMsg,
  "GroupMsg"
);
