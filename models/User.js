const mongoose = require('mongoose');
//const notificationSchema = require("./Notification");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   secondname:{
       type: String,
       lowercase:true,
    },
    firstname:{
        type: String,
        lowercase:true,
     },
    email:{
       type: String,
       lowercase:true
   },
   password:{
       type: String,
   },
   phone:{
    type: String,
    default:'000 000 000'
   },
   handle: {
      type: String,
      lowercase:true,
   },
   businessName: {
    lowercase:true,
         type: String
    },
   website: {
    lowercase:true,
         type: String
   },
   country: {
    lowercase:true,
         type: String
   },
   state: {
    lowercase:true,
      type: String
   },
   bio: {
    lowercase:true,
         type: String
   },

   userImage: {
      type: String
      },
   userImageData: {
      type: String,
      default:null
      },
   groupsCreated:[
        {
            post:{
                  type: Schema.Types.ObjectId,
                  ref: 'Group'
              }
          }
      ],
  groupsPartOff:[
    {
        post:{
              type: Schema.Types.ObjectId,
              ref: 'Group'
          }
      }
  ],
   posts:{
    type: Number,
    default:0
  },

  //notifications: [notificationSchema],

  followers:  [
          {
           
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
             }
          }
          ],
  following:  [
      {
           user:{
              type: Schema.Types.ObjectId,
              ref: 'users'
           }
      }
      ],
  userTypeAdmin :{
      type: Boolean,
      default: false,
  },

  userProgress:{
      type: Number,
      default: 1,
  },

  date:{
   type: Date,
    default: Date.now
},
    islogedin :{
        type: Boolean,
        default: false,
    },
});

module.exports = User = mongoose.model('users', UserSchema);