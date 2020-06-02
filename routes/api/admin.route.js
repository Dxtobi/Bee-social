const express = require( 'express' );
const router = express.Router();
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const _ = require("lodash");
const keys = require( '../../config/keys' );
const passport = require( 'passport' );
const validateRegisterInput = require( '../../validation/register' );
const validateLoginInput = require( '../../validation/login' );
const User = require( '../../models/User' );
const multer = require('multer')
const Post = require('../../models/Post')
//const Post = require('../../models/Post')
//const Post = require('../../models/Post')
//setting multer for image uplloading
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, './upload/')
    },
    filename:function (req, file, cb) {
        cb(null ,   Date.now() + file.originalname);
    }
});
//seting file filter for image
const fileFilter = (req, file , cb)=>{
    //reject
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG' || file.mimetype === 'image/JPEG' || file.mimetype === 'image/jpg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/gif' || file.mimetype === 'image/GIF'){
        cb(null, true)
    }else{
        cb(null, false)
        console.log('====================================');
        console.log('line 31 false : did not match');
        console.log('====================================');
    }
};
const upload = multer(
    {storage : storage,
     limits: {fileSize:1024*1024*5}, 
     fileFilter :fileFilter
    })

//router.get( '/test', ( req, res ) =>  res.json({ message: 'Users works!' }) );



router.post('/new/admin',   passport.authenticate( 'jwt', { session: false } ), async ( req, res, next) => {
   
});
    
    

module.exports = router;