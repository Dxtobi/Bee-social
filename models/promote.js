const mongoose = require("mongoose");

const { Schema } = mongoose;

const Promotepost = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
    },
    text: {
       type: String,
      // match: /^[A-Z0-9_#@]*$/ig
       //required: true
     },
    postImageData: {
    type: String
    },
    reported:{
        type:Boolean,
        default:false
    },
    promoted:{
        type:Number,
        default:2
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
     ],
    bookmarked: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    tags:[],
    comments: {
        type:Number,
        default:0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Promotepost", Promotepost, "Promotepost");
