const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
    },
    text: {
       type: String,
    },
    postImage: [],
    postImageData: [],
    repost: {
        type:Boolean,
        default:false
     },
    postedby: {
        type: Schema.Types.ObjectId,
        ref: 'users'
     },
    webSites: {
        type: String
     },
     
     companyName: {
     type: String
     },
    reported:{
        type:Boolean,
        default:false
    },
    isPromoted:{
        type:Boolean,
        default:false
    },
    promoted:{
        type:Number,
        default:1
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
    
    tags:  [],
    comments: {
        type:Number,
        default:0
    },
    lastcomments: {
           comment : {
            type:Schema.Types.ObjectId,
            ref: 'comment'
         }
        },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);