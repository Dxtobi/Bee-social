const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReportedUser = new Schema({
  report_id: {
    
        type: Schema.Types.ObjectId,
        ref: "users"
      
  },
  addressed:{
    type:Boolean,
    default:false
  },
  reasons: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("ReportedUser", ReportedUser, "ReportedUser");
