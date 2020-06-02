const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
   name:{

       type: String,

       required: true,

       trim:true,

       match: /^[A-Z0-9_-]*$/ig,


       
   },
});

module.exports = mongoose.model('Tag', Tag, 'Tag');