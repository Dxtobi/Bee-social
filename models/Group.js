const mongoose = require("mongoose");

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true
  },
  groupImage: {
    type: String
  },
  private_group: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});

module.exports = mongoose.model("Group", groupSchema, "Group");
