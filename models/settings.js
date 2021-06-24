const mongoose = require("mongoose");

const { Schema } = mongoose;


const SettingsSchema = new Schema({
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
             profile_private: {
                type: Boolean,
                default: false
            },
            date: {
                type: Date,
                default: Date.now
            }
 });

 module.exports = Settings = mongoose.model('settings', SettingsSchema );