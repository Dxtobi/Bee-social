const express = require( 'express' );
const router = express.Router();
const _ = require("lodash");
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const Profile = require( '../../models/Profile' );
const User = require( '../../models/User' );
const validateProfileInput = require( '../../validation/profile' );
//const validateExperienceInput = require( '../../validation/experience' );
//const validateEducationInput = require( '../../validation/education' );
const multer = require('multer')
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

router.get( '/test', ( req, res ) => { res.json({ message: 'Profile works!' }) });

router.get( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
    const errors = { };
    
    Profile.findOne( { user: req.user.id } )
        .populate( 'user', [ 'name', 'avatar' , 'email' , 'password'] )
        .then( profile => {
            if( !profile ){
                errors.noprofile = 'There is no profile for this user';
                return res.status( 400 ).json( errors );
            }   
            console.log('====================================');
            //console.log(profile);
            console.log('====================================');
            res.json( profile );
        })
        .catch( err => res.status( 404 ).json( err ) );
});

router.get( '/profiles', passport.authenticate( 'jwt', { session: false } ), async( req, res ) => {
    
  try {
        const profiles = await Profile.find()
        const shuffled = _.shuffle(profiles);
        res.status(200).send(shuffled);
  } catch (error) {
      console.log(error)
  }

});

router.patch( '/follow/:id',  passport.authenticate( 'jwt', { session: false } ), async ( req, res, next) => {

    try {
        //////////////// constant verables
                const errors = {}
                let add = true;
                const tobefollowed = req.params.id;

                //the follower
                const followingUser = await Profile.findOne({user : req.user.id})
                //the followee
                const followedByUser = await Profile.findById(tobefollowed)
                const followingUserProfileId = followingUser._id


                
                if(followingUser._id === followedByUser._id){
                    errors.message = 'User dose not exist';
                    console.log('90  ' + req.user.id)
                    add = false
                }

                if(add){
                    //check if user already following
                followingUser.following.map(profile =>{
                    console.log(profile.profile + ' 100')
                     if(profile.profile.toString() === req.params.id.toString() )
                     {
                         add = false
                         console.log('already following')
                         return errors.message = 'already following' , add
                     }
                 });
                }
                if(!followingUser || !followedByUser){
                    errors.message = 'User dose not exist';
                    console.log('90  ' + req.user.id);
                    add = false
                }
                if(add){
                         //add following  id to followers id set 
                    const quary = await Profile.findByIdAndUpdate(req.body.id , 
                        {$push : {followers : {profile : followingUserProfileId ,
                                               user : req.user.id}  
                                             }})
                    if (quary) {
                        console.log('====================================');
                        console.log(add + ' 111');
                        console.log('====================================');
                        //add id to following
                        await Profile.findByIdAndUpdate(
                            followingUserProfileId , { 
                                $push : {following : {profile: req.body.id ,  user : req.body.user }}
                          },{safe : true, upsert : true} 
                        );
                    }else{
                        add = false 
                        return add
                    }
                }

            } catch (error) {
                console.log('====================================');
                console.log(error.message);
                console.log('====================================');
                return error.message
            }

});

router.delete( '/unfollow/:id',  passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {

    try {
        //////////////// constant verables
                const errors = {}
                let add = true;
                const tobefollowed = req.params.id

                //the follower
                const followingUser = await Profile.findOne({user : req.user.id})
                //the followee
                const followedByUser = await Profile.findById(tobefollowed)
                const followingUserProfileId = followingUser._id

                if(!followingUser || !followedByUser){
                    errors.message = 'User dose not exist';
                    return errors.message
                }


                    //remove id to following
                    await Profile.findByIdAndUpdate(followingUserProfileId , { $pull : {following : {profile: req.params.id}}});


                    //add following  id to followers id set
                    await Profile.findByIdAndUpdate(req.params.id , {$pull : {followers : {profile : followingUserProfileId ,  user : req.user.id}   }})

            } catch (error) {
                console.log('====================================');
                console.log(error.message);
                console.log('====================================');
                return error.message
            }
    
});

router.get( '/handle/:handle', ( req, res ) => {
    
    const errors = { };
        
    Profile.findOne( { handle: req.params.handle } )
        .populate( 'user', [ 'name', 'avatar' ] )
        .then( profile => {
            if( !profile ){
                errors.noprofile = 'There is no profile for this user!';
                res.status( 400 ).json( errors );
            }
        
        res.json( profile );
    })
    .catch( err => res.status( 404 ).json( err ) );
});

router.get( '/user/:user_id', ( req, res ) => {
    
    const errors = { };
    
    Profile.findOne( { user: req.params.user_id } )
        .populate( 'user', [ 'name', 'avatar' ] )
        .then( profile => {
            if( !profile ){
                errors.noprofile = 'There is no profile for this user!';
                res.status( 400 ).json( errors );
            }
        
        res.json( profile );
    })
    .catch( err => 
        res.status( 404 ).json( { profile: 'There is no profile for this user!' } ) 
    );
});

router.post( '/',   passport.authenticate( 'jwt', { session: false } ),  upload.single('profileImageData'), async ( req, res ) => {

    console.log(req.file);
    //const { errors, isValid } = validateProfileInput( req.body );
    
    //if( !isValid ){
      //  return res.status( 400 ).res.json( errors );    
    //}
    
    const profileFields = { };
    
    profileFields.user = req.user.id;
    
    if( req.file ) profileFields.profileImageData = req.file.path;
    if( req.body.profileImage ) profileFields.profileImage = req.body.profileImage;
    if( req.body.handle ) profileFields.handle = req.body.handle;
    //if( req.file.path ) profileFields.profileImage = req.file.path;
    if( req.body.company ) profileFields.company = req.body.company;
    if( req.body.website ) profileFields.website = req.body.website;
    if( req.body.location ) profileFields.location = req.body.location;
    if( req.body.bio ) profileFields.bio = req.body.bio;
    if( req.body.mobile ) profileFields.mobile = req.body.mobile;
    try {
        const existProfile = await Profile.findOne({ user: req.user._id });
      //  console.log(req.body.profileImageData)
        if (existProfile) {
          const profile = await Profile.findByIdAndUpdate(
            existProfile._id,
            {
                profileFields
            },
            { new: true }
          );
    
          return res.status(201).json({ profile });
        } else {
          const handleCheck = await Profile.findOne({ handle });
          if (handleCheck) {
            errors.handle = "Handle by this name already exist";
            return genError(res, errors, 409);
          }
          const profile = new Profile({
            profileFields
          });
          await profile.save();
          await User.findByIdAndUpdate(req.user._id, { profile: profile._id });
    
          return res.status(201).json({ profile });
        }
    } catch (e) {
        throw e;
    }

});

router.delete( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
    Profile.findOneAndRemove( { user: req.user.id } )
        .then( () => {
            User.findOneAndRemove( { _id: req.user.id } )
                .then( () => {
                res.json( { success: true } ) 
            });
    });
});

module.exports = router;