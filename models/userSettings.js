const mongoose = require("mongoose");

const { Schema } = mongoose;


const CommentSchema  = new Schema({
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post'
             },
             handle:{
                type: String,
                required: true
             },
             user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
             },
             text: {
                type: String,
                required: true
             },
             likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'users'
                    }
                }
               ],
               replies: {
                  type:Number,
                  default:0
            },
     date: {
         type: Date,
         default: Date.now
     }
 });
 
 module.exports = Comment = mongoose.model('comment', CommentSchema );