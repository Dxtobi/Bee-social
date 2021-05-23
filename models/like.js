const mongoose = require("mongoose");

const { Schema } = mongoose;

const LikeSchema = new Schema({
 
    // if you want to make a group chat, you can have more than 2 users in this array
    post: {type:mongoose.Schema.Types.ObjectId, ref:'post', required:true },
    like:  [
        {
             user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
             }
        }
    ],
    likeFull:{
            type:Boolean,
            default: false
        },
    },
    {
        timestamps: true
    });


module.exports = mongoose.model(
  "Like",
  LikeSchema,
  "Like"
);
