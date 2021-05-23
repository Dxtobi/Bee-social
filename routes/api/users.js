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
const Notification = require('../../models/notification')
const multer = require('multer')
const Post = require('../../models/Post')
const Followers = require('../../models/followers')
const Following = require('../../models/following')
//setting multer for image uplloading
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, './upload/')
    },
    filename:function (req, file, cb) {
        cb(null ,   Date.now() + file.originalname);
    }
});
//setting file filter for image
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

const mapFunction = (f, array) => {
        let data=[]
                    console.log(array.length)
            let lnt = array.length

            if (f === 'following') {
                for (let i = 0; i < array.length; i++){
                    //  console.log('---', ...array[i].following, '---')
                    data.push(...array[i].following)
                    lnt--
                }
            }else{
                for (let i = 0; i < array.length; i++){
                    data.push(...array[i].followers)
                    lnt--
                }
            }

            if(lnt===0){
               // console.log(data)
                return data
            }
        }


//get profile
router.get( '/peopleyouknow', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    //console.log('hit')
    try {
        console.log('hit')
    const user = await User.findById({_id: req.user.id}).select('firstname secondname handle userImageData email bio posts phone')
        .lean()
        .exec();
    
    const followers = await User.findById({_id: req.user.id}).populate('followers.user').select('userImageData handle handle _id')
    const following = await User.findById({_id:req.user.id}).populate('following.user').select('userImageData handle handle _id')

    const profile = {
        user,
        followers:followers.followers,
        following:  following.following
    }
   // console.log(profile)
      return res.json(profile)
 } catch (error) {
     console.log(error.message, 'err')
 }
 



     /**
      * 
      * const errors = { };
    console.log('hit actions')
    User.findById(req.user.id ).populate('following.user', 'userImageData handle _id')//.populate('followers.user', 'userImageData handle _id')
        .then( user => {
            if( !user ){
                errors.nouser = 'There is no user for this user';
                return res.status( 400 ).json( errors );
            }
           // console.log(user)
            
            res.json( user );
        })
        .catch( err => res.status( 404 ).json( err ) );
      */
    
});
//create update profile
router.put( '/',   passport.authenticate( 'jwt', { session: false } ),  upload.single('userImageData'), async ( req, res ) => {
    let errors = { }
    const userFields = { };
    //console.log(req.body, req.file)
   // userFields.user = req.user.id;
    if( req.file ) userFields.userImageData = req.file.path;
    if( req.body.userImage ) userFields.userImage = req.body.userImage;
   //if( req.file.path ) userFields.userImageData = req.file.path;
    if( req.body.website ) userFields.website = req.body.website;
    if( req.body.mobile )  { parseInt(req.body.mobile) === 'NaN' || parseInt(req.body.mobile) === NaN ? userFields.phone = 234 : userFields.phone = parseInt(req.body.mobile)}
    if( req.body.country ) userFields.country = req.body.country;
    if( req.body.state ) userFields.state = req.body.state;
    if( req.body.businessName ) userFields.businessName = req.body.businessName;
    if( req.body.bio ) userFields.bio = req.body.bio;
    if( req.body.handle ) userFields.handle = req.body.handle;
    try {
        const existProfile = await User.findOne({ _id: req.user.id });
        console.log(req.body)
        if (existProfile) {
          
          const user = await User.findOneAndUpdate({
           _id: existProfile._id
         },
           { $set :
            userFields
            }
          ).then(user=>{
           // console.log(user)
            return res.status(201).json({ user });
          });
        }
    } catch (e) {
        throw e;
    }

});
router.get( '/', passport.authenticate( 'jwt', { session: false } ), async( req, res ) => {
    try {
          const users = await User.findOne({_id : req.user.id}).populate('following.user', 'userImageData handle _id').populate('followers.user', 'userImageData handle _id').select('-password ')
          
         return res.status(200).send(users);
    } catch (error) {
        console.log(error)
    }
});
//get other profile
router.get( '/profiles/pro', passport.authenticate( 'jwt', { session: false } ), async( req, res ) => {
    try {
          const users1 = await User.find({userProgress : 3}).select(['userImageData', 'handle','userProgress', 'firstname','secondname', '_id']).limit(3)
          const users2 = await User.find({userProgress : 1}).select(['userImageData', 'handle','userProgress', 'firstname','secondname', '_id']).limit(3)
          const users = [...users1, ...users2]
           // console.log(users)
          const shuffled = _.shuffle(users);
          res.status(200).send(shuffled);
    } catch (error) {
        console.log(error)
    }
});

router.post( '/register', ( req, res ) => {
    
   try {
    const { errors, isValid } = validateRegisterInput( req.body );
    console.log('hited')
    if( !isValid ){
        console.log('103', errors)
        return res.status( 400 ).json( errors );
    }
    User.findOne({ handle : req.body.handle })
        .then( user => {
        if( user ){
            errors.handle = 'handle already taken';
            console.log('109', errors)
            return res.status( 400 ).json( errors );
        }else{
            User.findOne({ email : req.body.email })
            .then( user => {
            if( user ){
               // console.log('hited 3') 
                errors.email = 'Email already exists';
                console.log('118', errors)
                return res.status( 400 ).json( errors );
            }else{
               // console.log('hited 4') 
                //if((req.body.handle === '' || req.body.handle === null || req.body.handle === undefined)||(req.body.password === '' || req.body.password === null || req.body.password === undefined) || (req.body.email === '' || req.body.email === null || req.body.email === undefined)){
                    const newUser = new User({
                        firstname: req.body.firstname,
                        secondname: req.body.secondname,
                        email: req.body.email,
                        handle: req.body.handle,
                        password: req.body.password,
                        
                    });
                    
                    bcrypt.genSalt( 10, ( err, salt ) => {
                        bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                            if( err ) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then( user => {
                                  //  console.log('saved')
                                    res.json( user )} )
                                .catch( err => console.log( err ) );
                        })
                    })
                
                console.log('registerd')
            }
        });
        }
    })
       // console.log('hited 2') 
    
   } catch (error) {
       console.log(error)
   }
});


router.post( '/admin/new', ( req, res ) => {
    
    try {
     const { errors, isValid } = validateRegisterInput( req.body );
  // console.log('hited')
     if( !isValid ){
        console.log('invalide', errors)
         return res.status( 400 ).json( errors );    
     }
     User.findOne({ handle : req.body.handle })
         .then( user => {
         if( user ){
             console.log('handle taken',errors)
             errors.handle = 'handle already taken';
             return res.status( 400 ).json( errors );
         }else{
             User.findOne({ email : req.body.email })
             .then( user => {
             if( user ){
                console.log('emails', errors) 
                 errors.email = 'Email already exists';
                 return res.status( 400 ).json( errors );
             }else{
                // console.log('hited 4') 
                 //if((req.body.handle === '' || req.body.handle === null || req.body.handle === undefined)||(req.body.password === '' || req.body.password === null || req.body.password === undefined) || (req.body.email === '' || req.body.email === null || req.body.email === undefined)){
                     const newUser = new User({
                         firstname: req.body.firstname,
                         secondname: req.body.secondname,
                         email: req.body.email,
                         handle: req.body.handle,
                         password: req.body.password,
                         userTypeAdmin:true,
                     });
                     bcrypt.genSalt( 10, ( err, salt ) => {
                         bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                             if( err ) throw err;
                             newUser.password = hash;
                             newUser.save()
                                 .then( user => {
                                   //  console.log('saved')
                                     res.json( user )} )
                                 .catch( err => console.log( err ) );
                         })
                     })
             }
         });
         }
     })
        // console.log('hited 2') 
     
    } catch (error) {
        console.log(error)
    }
 });

//get profile
router.get( '/admins/all', passport.authenticate( 'jwt', { session: false } ), async( req, res ) => {
    const errors = { };
    //console.log(req.user)
   if(/*req.user.isAdmin*/ 1 >0){ 

            const userA = await User.find( {userTypeAdmin : true} )
                                    .lean()
                                    .exec();
                                    //userProgress
            const userB = await User.find( {userProgress : 2} )
                                    .lean()
                                    .exec();
            //// USERS WITH  : PREMIUM ACCOUNT
            const userC = await User.find( {userProgress : 3} )
                                    .lean()
                                    .exec();
             //// USERS WITH  : LOST PREMIUM ACCOUNT
             const userD = await User.find( {userProgress : 4} )
                                    .lean()
                                    .exec();

             const nonPriveledge = userD.map(user => {
                                        return {
                                          User:user,
                                          is: "PreviosProAccount"
                                        };
                                      });
            const admins = userA.map(user => {
                                        return {
                                          User:user,
                                          is: "Admin"
                                        };
                                      });

            const reqPremium = userB.map(user => {
                                        return {
                                          User:user,
                                          is: "Request premium"
                                        };
                                      });
            const premiumAccount = userC.map(user => {
                                        return {
                                          User:user,
                                          is: "Premium Account"
                                        };
                                      });
            const allProfiles = [ ...admins, ...reqPremium, ...premiumAccount, ...nonPriveledge,]
            return res.status( 200 ).json( allProfiles );
                                }

  
})

router.post( '/login', ( req, res ) => {
    console.log('hited', req.body)
    const { errors, isValid } = validateLoginInput( req.body );
    if (!isValid) {
        console.log('error', errors)
        return res.json( errors )
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then( user => {
        //check for user
        if(!user){
            errors.email = 'Wrong details!';
            return res.status( 404 ).json( errors );
        }
        
        //check pass
        bcrypt.compare( password, user.password )
            .then( isMatch => {
            if( isMatch ){
                //create JWT payload
                const payload = { id: user._id, firstname: user.firstname, secondname: user.secondname, handle : user.handle, avatar : user.userImageData , admin:user.userTypeAdmin}
                
                jwt.sign(
                    payload, 
                    keys.secretKey, 
                    { expiresIn: 3600 * 60 * 60 * 60}, 
                    ( err, token ) => {
                        res.json({
                            success: true,
                            token: 'Bearer '+token
                        });
                });
                user.islogedin = true
                user.save()
                
            } else {
                
                errors.password = 'Wrong details!'; 
                return res.status( '400' ).json( errors );
            }
        }).catch(err =>{
            console.log(err.message)
        });
    }).catch(err =>{
        console.log(err.message)
    });
});
//get corrent user
router.get( '/current', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    //res.json( req.user );
    res.json({
        id: req.user.id,
        firstname: req.user.firstname,
        secondname: req.user.secondname,
        email: req.user.email,
        handle: req.user.handle,
    });
});

//get other profile
router.get( '/profiles', passport.authenticate( 'jwt', { session: false } ), async( req, res ) => {
    try {
          const users = await User.find()
          const shuffled = _.shuffle(users);
          res.status(200).send(shuffled);
    } catch (error) {
        console.log(error)
    }
});
// follow user
router.patch('/follow/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {

    try {
        //////////////// constant verables
                const errors = {}
                let add = true;
                const tobefollowed = req.params.id;
                console.log(req.params, req.user.id, )
                //the follower
                const followingUser = await User.findOne({_id : req.user.id})
                //the followee
                const followedByUser = await User.findById(tobefollowed)
                const followingUserProfileId = followingUser._id


                
                if(followingUser._id === followedByUser._id){
                    errors.message = 'User dose not exist';
                    console.log('90  ' + req.user.id)
                    add = false
                }

                if(add){
                    //check if user already following
                followingUser.following.map(profile =>{
                  //  console.log(profile.user + ' 100')
                     if(profile.user.toString() === req.params.id.toString() )
                     {
                         add = false
                       //  console.log('already following', req.params.id)
                         return errors.message = 'already following' , add
                     }
                 });
                }
                if(!followingUser || !followedByUser){
                    errors.message = 'User dose not exist';
                 //   console.log('90  ' + req.user.id);
                    add = false
                }
                if(add){
                  //  console.log(443)
                         //add following  id to followers id set 
                    const quary = await User.findByIdAndUpdate(req.params.id , 
                        {$push : {followers : {
                                               user : req.user.id}  
                                             }},{safe : true, upsert : true} )
                    if (quary) {
                        console.log('====================================');
                        console.log(add + ' 111');
                        console.log('====================================');
                        //add id to following
                        await User.findByIdAndUpdate(
                            followingUserProfileId , { 
                                $push : {following : {  user : tobefollowed }}
                          },{safe : true, upsert : true} 
                        );
                    }else{
                        console.log(460)
                        //add follow
                        add = false 
                        return add
                    }

                    let nf = {
                        message: `${req.user.handle} started following you.`,
                        link: `/profile/${req.user.id}`,
                        type:'Follow',
                        user:req.params.id,
                        avatar: req.user.userImageData
                        }
                    // console.log(nf)
                       let notif = new Notification(nf)
                       notif.save()
                }

            } catch (error) {
                console.log('====================================');
                console.log(error.message);
                console.log('====================================');
                return error.message
            }

});

//unfollow user
router.delete( '/unfollow/:id',  passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {

    try {
        //////////////// constant verables
                const errors = {}
                let add = true;
                const tobefollowed = req.params.id

                //the follower
                const followingUser = await User.findOne({_id : req.user.id})
                //the followee
                const followedByUser = await User.findById(tobefollowed)
                const followingUserProfileId = followingUser._id

                if(!followingUser || !followedByUser){
                    errors.message = 'User dose not exist';
                    return errors.message
                }
                    //remove id to following
                    await User.findByIdAndUpdate(followingUserProfileId , { $pull : {following : {user: req.params.id}}});
                    //remove following  id to followers id set
                    await User.findByIdAndUpdate(req.params.id , {$pull : {followers : {user : followingUserProfileId }   }})

            } catch (error) {
                console.log('====================================');
                console.log(error.message);
                console.log('====================================');
                return error.message
            }
    
});

//search by handle
router.get( '/handle/:id', async ( req, res ) => {
   try{
      // console.log('id')
    const user = await User.findById({_id: req.params.id}).select('firstname secondname handle userImageData email bio posts phone followers following').populate('followers.user', 'userImageData handle _id').populate('following.user', 'userImageData handle _id')
    .lean()
    .exec();

     

        const profile = {
            user,
        }
        //console.log(profile)
        return res.json(profile)
   } catch (err) {
    return res.json(err)
   }
});

//edit admin priviledge
router.put( '/adminedit/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    ///console.log('hited')
  if (req.user.isAdmin ) {
    if (req.user.id ===  req.params.id) {
        return res.status( 200 ).json({success:false});
    }else{
    const errors = { };
    User.findOne( { _id: req.params.id} )
        .then( user => {
            
               user.userTypeAdmin = !user.userTypeAdmin;
               user.save().then(user=>{
                   return res.status( 200 ).json({success:true});
                })
              
           
    })
    .catch( err => res.status( 404 ).json( err ) );
  }} else {
    res.status( 404 ).json( {success:false} )
  }
});

//edit admin priviledge
router.put( '/editProProfile/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
   // console.log(req.user)
  if (req.user.isAdmin) {
    const errors = { };
    User.findOne( { _id: req.params.id} )
        .then( user => {
            
              if( user.userProgress === 3){
                user.userProgress = 4
              }else{
                user.userProgress = 3
              }
               user.save().then(user=>{
                   return res.status( 200 ).json({success:true});
                })
    })
    .catch( err => res.status( 404 ).json( err ) );
  } else {
    res.status( 404 ).json( {success:false} )
  }
});
//delete account
router.delete( '/account/delete', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
   // Post.find()
    Post.deleteMany({ 
        user : req.user.id
       // field: '{ gte: 0' }
    }, (err) => {
       console.log(`Error: ` + err)
       
    });
    
    Following.deleteMany({ 
        user : req.user.id
       // field: '{ gte: 0' }
    }, (err) => {
       console.log(`Error: ` + err)
       
    });

    Followers.deleteMany({ 
        user : req.user.id
       // field: '{ gte: 0' }
    }, (err) => {
       console.log(`Error: ` + err)
       
    });
    User.findOneAndRemove(  req.user.id  )
        .then( () => {
                res.json( { success: true } ) 
            });
});
module.exports = router;