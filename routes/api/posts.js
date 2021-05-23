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
const Like = require('../../models/like');
const validatePostInput = require( '../../validation/post' );
const User = require( '../../models/User' );
const uploadFunctions = require( './mediaHandler' );
const resize = require('../../utils/resize');
//get all post
//api [GET]=== /api/posts/:skip-amount
router.get('/:skip', passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
   // console.log(req.params.skip)
                    try {

                        let user = await User.findOne({ _id: req.user.id }).populate('following').lean().exec()
                        
                            const following = user.following.reduce((arr, obj) => {

                                arr.push(obj.user)
                                return arr
                             }, [])
                           
                        following.push(req.user.id)
                       // console.log('fetching posts...')
                        const post1 =await Post.find()
                        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                        .populate(  'lastcomments.comment')
                            .sort( { date: -1 } )
                            .skip(parseInt(req.params.skip))
                            .limit(5).lean().exec()

                       // let user = await User.findOne({_id:req.user.id}).lean().exec()
                     //   console.log(following)
                        let post2 = await Post.find({user: { $in : following } })
                        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
                        .populate(  'lastcomments.comment')
                            .sort( { date: -1 } )
                            .skip(parseInt(req.params.skip))
                            .limit(10).lean().exec()
                            const allPost = [ ...post2]
                        return res.status( 200 ).json(allPost)
                    } catch (error) {
                        console.log(error.message)
                        //error.message = 'Sorry network problems!' 
                       return  res.status( 400 ).json( { error } )
                    }
                
            
        });

        //get all post
//api [GET]=== /api/posts/:skip-amount
router.get('/test', async (req, res) => {
    try {
       
        const post3 = await Post.find({sureAccount:true})
        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
        .populate(  'lastcomments.comment')
       // .populate(  'lastcomments.comment.user')
            .sort( { date: -1 } )
            .limit(5).lean().exec()
        const post1 =await Post.find({promoted:3})
        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
        .populate(  'lastcomments.comment')
            .sort( { date: -1 } )
            .limit(5).lean().exec()
        const post2 = await Post.find({promoted:1})
        .populate( 'user',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
        .populate( 'postedby',  ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'] )
        .populate( 'lastcomments.comment',)
       // .populate('likes.like')
       // .populate(  'lastcomments.comment.user')
            .sort( { date: -1 } )
            .limit(5).lean().exec()
            const returnWithOutDouble = (array) => {
                let all = []
                let don  = false
                let hash =Object.create(null)
                array.forEach((u)=>{
                let key = JSON.stringify(u);
                hash[key] =(hash[key]||0)+1;
                if(hash[key]>=2){
                    return null
                }else{
                    don = true
                    return all.push(JSON.parse(key))
                }
                })
            if (don) {
                return all
            }
        }
            const allPost = [...post3, ...post2, ...post1]
           /* let all = []
            let hash =Object.create(null)
            allPost.forEach((u)=>{
            let key = JSON.stringify(u);
            hash[key] =(hash[key]||0)+1;
            if(hash[key]>=2){
                return null
            }else{
                return all.push(JSON.parse(key))
            }
            })*/
      //  console.log(all)
        return res.status( 200 ).json( returnWithOutDouble(allPost) )
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
                     return res.json( post )
            })
            .catch( err => {
                console.log(err)
                res.status( 404 ).json( { nopostfound: 'No post found with that id!' } )
            } );
        });


/**
|--------------------------------------------------
| Make a post to the site
api ===[POST] /api/posts/
|--------------------------------------------------
*/
router.post( '/',  uploadFunctions.upload.array('postImageData'), passport.authenticate( 'jwt', { session: false } ), async( req, res, next ) => {

     
           let allimg = uploadFunctions.pushImgs(req.files)
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

            //image
            postFields.postImageData = allimg;
            // other parts

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
                                   // socketFun.newPostEvent('posts',  [post])

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
router.put( '/status',  uploadFunctions.upload.array('imgs'), passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {


                   let allimg = uploadFunctions.pushImgs(req.files)
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

 /**
--------------------------------------------------
| Make a get to the site
api ===[GET] /api/posts/
|--------------------------------------------------
*/
//getstatus

/**
|--------------------------------------------------
| Make a Advert reques to the site site
api ===[POST] /api/posts/new/ads
|--------------------------------------------------
*/
router.post( '/new/ads',  uploadFunctions.upload.single('ads_media'), passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
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
router.patch('/like/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    
try {
// console.log('1')
     Post.findById( req.params.id )
     .populate( 'user',  ['_id'] )
     .then( post => {
       // console.log(req.user.userImageData)

                     let pst = post.likes.some( (marked) => {  console.log(marked.user, req.user.id);
                                         if(marked.user.toString() === req.user.id.toString()){
                                            console.log('2')
                                             return true
                                         } } )
                     console.log(post, pst)
                     if(!pst){
                      console.log('never marked')
                         post.likes.unshift( { user: req.user.id } )
                         post.save().then(post => {
                            if(post.user._id.toString() != req.user.id.toString()){
                                let nf = {
                                    message: `${req.user.handle} Likes your post`,
                                    link: `/post/${post._id}`,
                                    type:'Liked',
                                    user:post.user._id,
                                    avatar: req.user.userImageData
                                    }
                                // console.log(nf)
                                   let notif = new Notification(nf)
                                   notif.save()
                            }
                            return res.status(200)
                         })
                         
                     }else{
                             const removeindex = post.likes
                                                        .map( item => item.user.toString() )
                                                        .indexOf( req.user.id );
                                 post.likes.splice( removeindex, 1 );
                                 post.save().then( post =>{
                                   return
                                 })
                     }
             }).catch( err => {

                  console.log(err)
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
        res.status( 404 ).json( { message: ' request error !' } ) 
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
                  //console.log(post)
                    let nf = {
                        message: `${req.user.handle} commented on your post`,
                        link: `/post/${post._id}`,
                        type:'Comment',
                        user:post.user._id,
                        avatar: req.user.userImageData
                        }
                    // console.log(nf)
                       let notif = new Notification(nf)
                       notif.save()

                post.comments = post.comments+1 ;
                post.lastcomments = {comment: comment.id}
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

router.post( '/reply/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
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
                 Comment.findById( req.params.id ).populate( 'user',  ['_id userImageData'] )
                 .then( post => {
                   //console.log(post)
                     let nf = {
                         message: `${req.user.handle} replied your comment`,
                         link: `/post/${post._id}`,
                         type:'Replied',
                         user:post.user._id,
                         avatar: post.user.userImageData
                         }
                     // console.log(nf)
                        let notif = new Notification(nf)
                        notif.save()
 
                 post.replies = post.replies+1 ;
                 post.save()
               
                return res.json(post)
             })
          
             } )
             
             .catch( err => { res.status( 404 ).json( { postnotfound: 'No post found!' } ) });
             
 });

/**
|--------------------------------------------------
| Make GET comment request for all the comments to a particuler post
api ===[GET] /api/posts/comment/:cpost id
|--------------------------------------------------
*/
router.get( '/comments/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            
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
| Make GET comment request for rcoment 
api ===[GET] /api/posts/comment/:cpost id
|--------------------------------------------------
*/
router.get( '/comment/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    try {

       // console.log('hited get comments')
        //const ids = {post : req.params.id}
       // console.log(ObjectID)
        Comment.findOne({
          _id : req.params.id
        }).populate( 'user', ['userImageData', 'handle','userProgress', 'firstname','secondname', '_id'])
        
        .then(comment=>{
            //console.log(comments)
            return res.status(200).json( comment );
        })
       
      } catch (err) {
          console.log(err)
        return res.status(500).json({ err });
      }
});

router.get( '/replies/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
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
        return res.status(400).json({ err });
      }
});
/**
|--------------------------------------------------
| Delete comment from a post //needs to be worked on
api ===[DELETE] /api/posts/comment.......
|--------------------------------------------------
*/
router.delete( '/comment/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
            console.log(req.params.id)
            Comment.findOneAndDelete({_id : req.params.id} )
                .then( post => {
                    console.log(post)
                   return res.status( 200 ).json( { message:'deleted' } )
            })
            .catch( (err) => {
                console.log(err)
                return res.status( 404 ).json( { postnotfound: 'No post found!' } ) });
            
        });
        
/**
|--------------------------------------------------
| Bookmark a post
api ===[PATCH] /api/posts/bookmarks/:post id
|--------------------------------------------------
*/
router.patch('/bookmarks/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
          // console.log()
    try {
       // console.log(post, pst)
            Post.findById( req.params.id )
            .populate( 'user',  ['_id'] )
            .then( post => {

                            let pst = post.bookmarked.some( (marked) => { // console.log(marked.user, req.user.id);
                                                if(marked.user.toString() === req.user.id.toString()){
                                                    return true
                                                } } )
                            console.log(post, pst)
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
                                        avatar: req.user.userImageData
                                        }
                                    // console.log(nf)
                                      //  req.notification.repostNotification(nf)
                                        let notif = new Notification(nf)
                                        notif.save()
                                     newPost.save().then((post)=>{
                                       // console.log(post)
                                     
                                        res.json( { success: true , message:' post shared'} )
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
                                           return res.status(200).json( { success: true , message:'you removed from shared posts'} )} );
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
           return null
        });
        
        post.remove()
        res.json( { success: true } );
    }).catch( err => res.status( 404 ).json( err ) );

});

router.patch('editPost/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    let postUpdatesFilds
    if( req.body.text ) postUpdatesFilds.text = req.body.text;
    Post.findOneAndUpdate({
        _id: req.params.id
        },
        { $set :
            postUpdatesFilds
         }
       ).then(post=>{
         console.log(postUpdatesFilds, post)
         return res.status(201).json({ post });
       })
    
})


module.exports =  router




