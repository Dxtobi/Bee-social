const express = require('express');
const router = express.Router();
////const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
//const path = require('path');
const _ = require("lodash");
const Post = require( '../../models/Post' );
const Status = require( '../../models/status' );
const Comment = require('../../models/comment');
const Notification = require('../../models/notification')
const Tags = require('../../models/Tags');
const validatePostInput = require( '../../validation/post' );
const multer = require('multer');
//const fs = require('fs');
const resize = require('../../utils/resize');
//const sharp = require('sharp')


const storage = multer.diskStorage({
    destination:function  (req, file, cb) {
            cb(null, './upload/')
        },
   // function  (req, file, cb) {
    //    cb(null, './uploads/')
    //},
    filename:function (req, file, cb) {
        cb(null , 'trybes'+ Date.now() + file.originalname);
      //  console.log(file.originalname , file)
    },
    resize:function(req, file, cb){
      
    }
})
const fileFilter = (req, file , cb)=>{
    //reject
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG' || file.mimetype === 'image/JPEG' || file.mimetype === 'image/jpg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/gif' || file.mimetype === 'image/GIF'){
        cb( null, true)
        
    }else{
        cb(null, false)
        console.log('====================================');
        console.log('line 31 false : did not match : ' + file.mimetype);
        console.log('====================================');
    }
};
const upload = multer(
    {storage : storage,
     limits: {fileSize:1024*1024*5}, 
     fileFilter :fileFilter
    })

const pushImgs =(array)=>{
        //let x = array.length
        let newArray=[]
        let y = array.length
      
        for (let index = 0; index < array.length; index++) {

            newArray.push(array[index].path);
         y--
        }
         if(y === 0){
           return newArray
         }
    }


module.exports = (io) => {
        let socketFun = {}
        //declearing all socket function for post
        io.on('connection', function(socket) {
          //  console.log('user connect ')
            socketFun = {
                newPostEvent : (event, data)=>{ 
                    socket.broadcast.emit(event, data)
                },
            }
            //console.log('new connection ' + socket.id);
        });
        io.on('disconnect', function(socket) {
           // console.log('user disconnect ');
        });
        
//get all post
//api [GET]=== /api/posts/:skip-amount
router.get('/:skip', async (req, res) => {
                    try {
                         ///get only advert post that has been aproved
                        const post1 =await Post.find({promoted:3})
                        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                        .populate(  'lastcomments.comment')
                       // .populate(  'lastcomments.comment.user')
                            .sort( { date: -1 } )
                            .skip(parseInt(req.params.skip))
                            .limit(5).lean().exec()
                            ///get normal post 
                        const post2 = await Post.find({promoted:1})
                        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                        .populate( 'postedby',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                        .populate( 'lastcomments.comment',)
                       // .populate(  'lastcomments.comment.user')
                            .sort( { date: -1 } )
                            .skip(parseInt(req.params.skip))
                            .limit(5).lean().exec()
    
                        const all =[ ...post2, ...post1]
                        console.log(all)
                        return res.status( 200 ).json( all )
                    } catch (error) {
                        console.log(error.message)
                        //error.message = 'Sorry network problems!' 
                       return  res.status( 500 ).json( { error } )
                    }
                
            
        });
/**
|--------------------------------------------------
| Get single post 
api ===[GET] /api/posts/single/:post id
|--------------------------------------------------
*/
router.get('/single/:id', passport.authenticate( 'jwt', { session: false } ) , (req, res) => {
   // console.log('hitd this route')
            Post.findOne( {_id : req.params.id} )
            .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                .then( post => {
                res.json( post )
            })
            .catch( err => {console.log(err.message)
                res.status( 404 ).json( { nopostfound: 'No post found with that id!' } )} );
        });
/**
|--------------------------------------------------
| Get post belonging o a single user
api ===[GET] /api/posts/user/:user id
|--------------------------------------------------
*/
router.get('/user/:id', passport.authenticate( 'jwt', { session: false } ) ,(req, res) => {
   // console.log('hited')

    
            Post.find( {'user' : req.params.id} )
            .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                .then( post => {
              //  console.log('====================================')
               // console.log(post.comments)
               // console.log('====================================')
                     return res.json( post )
                
            })
            .catch( err => {
                console.log(err)
                res.status( 404 ).json( { nopostfound: 'No post found with that id!' } )
            } );
        });
/**
|--------------------------------------------------
| Get all tags in the site
api ===[GET] /api/posts/tags/all
|--------------------------------------------------
*/
router.get( '/tags/all', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
    try {
      //  console.log('hited')
       // console.log('hited get comments')
        //const ids = {post : req.params.id}
       // console.log(ObjectID)
        Tags.find() 
            .then(tags=>{
           //     console.log(tags)
                return res.status(200).json( tags );
            })
       
      } catch (err) {
          console.log(err)
        return res.status(500).json({ err });
      }
     
});
/**
|--------------------------------------------------
| Make a post to the site
api ===[POST] /api/posts/
|--------------------------------------------------
*/
router.post( '/',  upload.array('postImageData'), passport.authenticate( 'jwt', { session: false } ), async( req, res, next ) => {

          // console.log(req.files)
          // console.log(req.body)
           // console.log(req.file)
           //resize(`./uploads/${file.originalname}`, file.mimetype, imgW, imgH )
           let allimg = pushImgs(req.files)
            const { errors, isValid } = validatePostInput( req.body );

           if( !isValid ){
            let error = errors
            console.log(errors)
            return res.status( 400 ).json( error );
           }

           if(!req.body.text && req.files.length < 1){
            console.log('empty')
            return res.status( 400 );
           }
            const postFields = { };
            let t = req.body.tags;
            let tsA = t.split(" ")

            //image
            postFields.postImageData = allimg;
            // other parts

            if( req.body.name ) postFields.name = req.body.name;
            if( req.body.Topic ) postFields.Topic = req.body.Topic;
            postFields.tags = tsA;
            if( req.body.text ) postFields.text = req.body.text;
            postFields.user = req.user.id;
            resize(req.files)
            //console.log(postFields)
            const newPost = new Post( postFields );
             newPost.save().then(
               
                        pst => {
                           // resize(req.files)
                            Post.findOne( {_id : pst._id} )
                            .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                            .populate( 'postedby',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                                .then( post => {
                                   
                                    socketFun.newPostEvent('posts',  [post])

                                  User.findById( req.user.id )
                                  .then(user => {

                                  user.posts = user.posts+1 ;

                                  user.save()

                                 res.json( post )
                                  })
                                
                            })
                             
                        }
                    ).catch(e => {
                        consoe.log(errors)
                        return res.status( 404 ).json( err )
                    })
          
            .catch( err => {console.log("erro ==== "+errors)
                res.status( 404 ).json( errors )} )
            
        });
/**
--------------------------------------------------
| Make a post to the site
api ===[POST] /api/posts/
|--------------------------------------------------
*/
//getstatus
router.put( '/status',  upload.array('imgs'), passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {


                   let allimg = pushImgs(req.files)
                   // console.log(req.file)
                    let postFields = {}
                   //const { errors, isValid } = validatePostInput( req.body );

                    postFields.media = allimg;
                    postFields.user = req.user.id;
                    // other parts
                    if( req.body.text ) postFields.text = req.body.text;
                    resize(req.files)
                   //console.log(postFields)
                    const newStatus = new Status( postFields );
                    var days = parseInt(req.body.expiration.replace(/[^\d]+/g, "")) || 1;
                   // newStatus.createdAt.expireAfterSeconds = 60
                    newStatus.expirationDate = new Date(Date.now() + (days * 24 * 3600 * 1000))
                    newStatus.save().then(()=>{
                        Status.find().then((p)=>{
                            return res.status(200).json( p );
                        })
                    })
                  .catch( err => {console.log(err) 
                        res.status( 404 ).json( err )} )
                    
                });

/**
--------------------------------------------------
| Make a get to the site
api ===[GET] /api/posts/
|--------------------------------------------------
*/
//getstatus
router.get( '/status/get',  passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    console.log('====')
    Status.find().populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] ).then((p)=>{
        return res.status(200).json( p );
    })

 });
 /**
--------------------------------------------------
| Make a get to the site
api ===[GET] /api/posts/
|--------------------------------------------------
*/
//getstatus
router.get( '/status/:id',  passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

   
    Status.find({user:req.params.id}).select( 'media').populate( 'user',  ['userImageData', 'handle'] ).then((p)=>{
        return res.status(200).json( p );
    })

 });
/**
|--------------------------------------------------
| Make a Advert reques to the site site
api ===[POST] /api/posts/new/ads
|--------------------------------------------------
*/
router.post( '/new/ads',  upload.single('ads_media'), passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
            try {
                let t = req.body.tags;
                let tsA = t.split(",")
                const postFields = { };
               // console.log('hited ads-----', req.body.ads_media)
                //console.log(req.files)
                if( req.file ) postFields.postImageData = req.file.path;
        
                // other parts
                if( req.body.companyName ) postFields.companyName  = req.body.companyName ;
                if( req.body.webSites ) postFields.webSites = req.body.webSites;
                postFields.tags = tsA;
                if( req.body.info ) postFields.text = req.body.info;
                postFields.user = req.user.id;
                postFields.promoted = 2
                console.log(postFields)
               // const newPost = new Post( postFields );
               const post = new Post(postFields)
               post.save().then(
                   doc =>{
                       req.notification.adsNotification(req.user, postFields.companyName)
                    return res.status(201).json(doc);
                   }
               )
               
               //  newPost.save().then(e=>res.status(200))

              } catch (err) {
                console.log(err)
                return res.status(500).json({ err });
              }
             
        });
/**
|--------------------------------------------------
| Make a new tag for site
api ===[POST] /api/posts/tags/new
|--------------------------------------------------
*/
router.post( '/tags/new', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
            try {
                let error = {}
                console.log('hited tags-----', req.body)
                
               if (req.body.tagname === '' || req.body.tagname === undefined || req.body.tagname === null) {
                return res.status(500).json( error.tag = 'use a defined text format');
               }
               let tag = new Tags({
                   name: req.body.tagname
               }) 
                
               tag.save().then(tag =>{
                return res.status(200).json(tag)
               })
               
              } catch (err) {
                console.log(err)
                return res.status(500).json({ err });
              }
             
        });
/**
|--------------------------------------------------
| Delete a tag from site
api ===[DELETE] /api/posts/tags/:tag id
|--------------------------------------------------
*/
router.delete( '/tags/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

           Tags.deleteOne({ 
               _id: req.params.id 
           }, (err) => {
              console.log(`Error: ` + err)
           })

        });
/**
|--------------------------------------------------
| Like a Post // unlike
api ===[POST] /api/posts/like/: post id
|--------------------------------------------------
*/
router.post( '/like/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
              // console.log('hited likes')
    Post.findById( req.params.id ).populate( 'user',  ['userImageData', 'handle', '_id'] )
                    .then( post => {

                    let pst = post.likes.some( (like) => {  console.log(like.user, req.user.id);
                                         if(like.user.toString() === req.user.id.toString()){
                                             return true
                                         } } )
                  //  console.log(post, req.user)
                    if(!pst){
                       // console.log('never liked' )
                        post.likes.unshift( { user: req.user.id } )
                        post.save().then( post =>{
                            
                            let nf = {
                                message: `${req.user.handle} likes on your post`,
                                link: `/post/${post._id}`,
                                type:'Like',
                                user:post.user._id,
                                avatar: post.postImageData[0]
                                }

                                let notif = new Notification(nf)
                                notif.save()
                            


                        })
                          
                    }else{
                       
                            const removeindex = post.likes
                            .map( item => item.user.toString() )
                            .indexOf( req.user.id );
                                post.likes.splice( removeindex, 1 );
                                post.save().then( post =>{
                                   // socketFun.newPostEvent('postunlike',  [post])
                                  return  res.status(200).json( { success: true , message:'you unliked this post'} )} );
                        
                    }
               }).catch( err => res.status( 404 ).json( err ) );
            
        });
/**
|--------------------------------------------------
| Make a Post report to the site
api ===[POST] /api/posts/report-post/:post id
|--------------------------------------------------
*/
router.post( '/report-post/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    
   Post.findById(req.params.id).then(post=>{
    post.reported = true
    post.save()
   }).catch( err => {
        console.log(err)
        res.status( 404 ).json( { postnotfound: ' request error !' } ) 
    });
    
});
/**
|--------------------------------------------------
| Make a Post aproval to the site
api ===[PATCH] /api/posts/aproved-post/:post id
|--------------------------------------------------
*/
router.patch( '/aproved-post/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    Post.findById(req.params.id).then(post=>{
     post.promoted = 3
     post.save()
     res.status( 200 ).json( {message:'success'} ) 
    }).catch( err => {
         console.log(err)
         res.status( 404 ).json( { message: ' request error !' } ) 
     });
     
 });
/**
|--------------------------------------------------
| Make a Get request to the site for all reported post || advert request
api ===[GET] /api/posts/report-post/all
|--------------------------------------------------
*/
router.get('/report-post/all', passport.authenticate( 'jwt', { session: false } ), async ( req, res , next) => {
    //console.log(req.user)
        try {
            if(req.user.isAdmin){
                const reported_post = await Post.find({
                     reported:true
                 }).populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                   .sort( { date: -1 } ).lean().exec()
                const promoted_post = await Post.find({
                     promoted:2
                 }).populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                   .sort( { date: -1 } ).lean().exec()
         
                   const all = [...reported_post, ...promoted_post]
                  return res.status( 200 ).json(all )
                 }else{
                    return res.status(500).json({message : 'Wrong request'});
                 }
        } catch (error) {
            return res.status(500).json({message : 'something went wrong'});
        }
    //next()
});
/**
|--------------------------------------------------
| Make a comment on a post site
api ===[POST] /api/posts/comment/:post id
|--------------------------------------------------
*/
router.post( '/comment/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
   // console.log(req.body)
            const { errors, isValid } = validatePostInput( req.body );
            
            if( !isValid ){
                return res.status( 400 ).json( errors );    
            }
             new Comment({
                text: req.body.text,
                user: req.user.id,
                post: req.params.id,
                handle:req.user.handle
            }).save().then( comment => {
               // console.log(comment)
                Post.findById( req.params.id ).populate( 'user',  ['_id'] )
                .then( post => {
                  //  console.log(post)
                    let nf = {
                        message: `${req.user.handle} commented on your post`,
                        link: `/post/${post._id}`,
                        type:'Comment',
                        user:post.user._id,
                        avatar: post.postImageData[0]
                        }
                    // console.log(nf)
                       
                       let notif = new Notification(nf)
                       notif.save()

                post.comments = post.comments+1 ;
                post.lastcomments.push({comment: comment.id  })
                post.save()
               // socketFun.newPostEvent('postcoment',  [post])
               return res.json(post)
            })
            
          /* Post.findByIdAndUpdate(  req.params.id , { 
                        $push : {lastcomments : {comment: comment.id  }}
                },{safe : true, upsert : true} )
                */
            } )
            
            .catch( err => res.status( 404 ).json( { postnotfound: 'No post found!' } ) );
            
        });
/**
|--------------------------------------------------
| Make GET comment request for all the comments to a particuler post
api ===[GET] /api/posts/comment/:cpost id
|--------------------------------------------------
*/
router.get( '/comment/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
            try {
      
               // console.log('hited get comments')
                //const ids = {post : req.params.id}
               // console.log(ObjectID)
                Comment.find({
                  post : req.params.id
                }).populate( 'user', ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'])
                
                .then(comments=>{
                    //console.log(comments)
                    return res.status(200).json( comments );
                })
               
              } catch (err) {
                  console.log(err)
                return res.status(500).json({ err });
              }
             
        });
/**
|--------------------------------------------------
| Delete comment from a post //needs to be worked on
api ===[DELETE] /api/posts/comment.......
|--------------------------------------------------
*/
router.delete( '/comment/:id/:comment_id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
            Post.findById( req.params.id )
                .then( post => {
                
                //check if comment exists
                if( post.comments.filter( comment => comment._id.toString() === req.params.comment_id ).length === 0){
                    return res.status( 404 ).json( { commentnoexists : 'Comment does not exists!' } );
                }
                
               const removeIndex = post.comments
                        .map( item => item._id.toString() )
                        .indexOf( req.params.comment_id );
                
                post.comments.splice( removeIndex, 1 );
                
                post.save().then( res.json( post ) );
                             
            })
            .catch( err => res.status( 404 ).json( { postnotfound: 'No post found!' } ) );
            
        });
        
/**
|--------------------------------------------------
| Bookmark a post
api ===[PATCH] /api/posts/bookmarks/:post id
|--------------------------------------------------
*/
router.patch('/bookmarks/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
           try {
            Post.findById( req.params.id )
            .populate( 'user',  ['_id'] )
            .then( post => {

                            let pst = post.bookmarked.some( (marked) => { // console.log(marked.user, req.user.id);
                                                if(marked.user.toString() === req.user.id.toString()){
                                                    return true
                                                } } )
                            //console.log(post, pst)
                            if(!pst){
                            // console.log('never marked')
                                post.bookmarked.unshift( { user: req.user.id } )
                                post.save().then( post =>{
                                    const puser = post.user._id
                                  const postFields = { };
                                    if( post.postImageData ) postFields.postImageData = post.postImageData;
                                    if( post.text ) postFields.text = post.text;
                                    if( post.tags ) postFields.tags = post.tags;
                                    postFields.user = req.user.id
                                    postFields.postedby = puser
                                    postFields.repost = true
                                  //  console.log(postFields)
                                    const newPost = new Post( postFields );
                                    let nf = {
                                        message: `${req.user.handle} shared your post`,
                                        link: `/post/${post._id}`,
                                        type:'Repost',
                                        user:puser,
                                        avatar: post.user.userImageData
                                        }
                                    // console.log(nf)
                                      //  req.notification.repostNotification(nf)
                                        let notif = new Notification(nf)
                                        notif.save()
                                     newPost.save().then((post)=>{
                                       // console.log(post)
                                     
                                        res.json( { success: true , message:'you marked post'} )
                                     }
                                     );
                                   
                                })
                                
                            }else{
                                    const removeindex = post.bookmarked
                                    .map( item => item.user.toString() )
                                    .indexOf( req.user.id );
                                        post.bookmarked.splice( removeindex, 1 );
                                        post.save().then( post =>{
                                        Post.findById(req.params.id).then((post)=>{
                                            post.remove()
                                           // console.log('remove marked', removeindex)
                                           return res.status(200).json( { success: true , message:'you unmark post'} )} );
                                        })
                                       // 
                                
                            }
                    }).catch( err => {

                       //  console.log(err)
                         return res.status( 404 ).json( err )

                        } );
              // return res.status(200).json({message:'susses'})
           } catch (error) {
            console.log(error)
            return res.status( 404 ).json( {message:'something  went wrong'} )
           }
            
        });
/**
|--------------------------------------------------
| Delete post from site
api ===[DELETE] /api/posts/:post id
|--------------------------------------------------
*/
router.delete( '/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    Post.findById( req.params.id )
        .then( post => {
        console.log(req.params.id, post, req.user.id)
        if( (post.user.toString() !== req.user.id.toString()) && !req.user.isAdmin ){
            console.log(post.user, req.user.id)
            return res.status( 401 ).json( { notauthorized: 'User not authorized!' } );
        }
        Comment.deleteMany({ 
            post : req.params.id ,
        }, (err) => {
           console.log(`Error: ` + err)
        });
        
        post.remove()
        res.json( { success: true } );
    }).catch( err => res.status( 404 ).json( err ) );

});
        return router
}


