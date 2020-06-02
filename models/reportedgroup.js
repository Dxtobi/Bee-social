const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReportedGroup = new Schema({
  report_id: {
    
        type: Schema.Types.ObjectId,
        ref: "Group"
      
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

module.exports = mongoose.model("ReportedGroup", ReportedGroup, "ReportedGroup");
