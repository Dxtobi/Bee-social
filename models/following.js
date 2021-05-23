const mongoose = require("mongoose");

const { Schema } = mongoose;

const FollowingSchema = new Schema({
 
    // if you want to make a group chat, you can have more than 2 users in this array
    user: {type:mongoose.Schema.Types.ObjectId, ref:'users', required:true },
    following:  [
        {
             user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
             }
        }
    ],
    followingFull:{
            type:Boolean,
            default: false
        },
    },
    {
        timestamps: true
    });


module.exports = mongoose.model(
  "Following",
  FollowingSchema,
  "Following"
);
