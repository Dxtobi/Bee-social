

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ConversationHandlerSchema = new Schema({
    type:{
        type: String,// group or single,
        default:'oneToOne'
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    users:[ {type:mongoose.Schema.Types.ObjectId, ref:'users', required:true }],
    starter: { type:mongoose.Schema.Types.ObjectId, ref:'users', required:true },
    date: {
      type: Date,
      default: Date.now
    },
    lastMessage:{type:mongoose.Schema.Types.ObjectId, ref:'Conversation',},
    blocked: {
        type: Boolean,
        default:false
    },
  },
  {
    timestamps: true
  });


module.exports = mongoose.model(
  "conversationHandler",
  ConversationHandlerSchema,
  "conversationHandler"
);




