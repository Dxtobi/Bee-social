const mongoose = require("mongoose");

const { Schema } = mongoose;
const status = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
    },
  expirationDate: {
        type: Date,
        expires: 0
      },
  createdAt: {
          type: Date,
        default: Date.now
     },

  text:{
        type:String
    },
  media:[
      
    ]
  }, 
  {
    timestamps: true
  });

module.exports = mongoose.model("Status", status, "Status");
