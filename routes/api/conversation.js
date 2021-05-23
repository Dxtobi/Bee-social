const express = require('express');
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const User = require("../../models/User");
const Group = require("../../models/Group");
const Message = require("../../models/conversation");
const Conversation = require("../../models/conversationHandler");
const genError = require("../../utils/generateError");
const dateGen = require('../../utils/dateGenerator')
const multer = require('multer');
//const io = require('../../server')
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, './upload/')
    },
    filename:function (req, file, cb) {
        cb(null , 'trybes'+Date.now() + file.originalname);
    }
})
const fileFilter = (req, file , cb)=>{
    //reject
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG' || file.mimetype === 'image/JPEG' || file.mimetype === 'image/jpg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/gif' || file.mimetype === 'image/GIF'){
        cb(null, true)
    }else{
        cb(null, false)
        console.log('====================================');
        console.log('line 31 false : did not match : ' + file.mimetype);
        console.log('====================================');
    }
};
const upload = multer(
    {storage : storage,
     limits: {fileSize:1024*1024*100}, 
     fileFilter :fileFilter
    })
const pushImgs =(array)=>{
  //let x = array.length
  let newArray=[]
  let y = array.length

  for (let index = 0; index < array.length; index++) {
    newArray.push(array[index].path);
   // console.log(req.files[index].path)
   y--
  }
   if(y === 0){
     return newArray
   }
}


// @route   POST api/Message/send-message
// @desc    send message
// @access  POST
router.post("/send-message", upload.array('msgimg'), passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    console.log(req.body)
  
    let allimg = pushImgs(req.files)

    const quarry = [mongoose.Types.ObjectId(req.user.id), mongoose.Types.ObjectId(req.body.id)]
    let message_content
    Conversation.findOne({ _id:req.body.conversationId }).then((con) => {
      
      if (con) {
          const newMessage = new Message({
            users : quarry,
            message :{ text : req.body.text, media:allimg},
            sender: req.user.id,
            conversationId:req.body.conversationId
          })
          console.log(con._id, )
          newMessage.save().then(msg=>{
            con.lastMessage = msg
            con.save();
            global.io.in(req.body.conversationId).emit("incoming_message", { message: msg });
         // global.io.to(con.id).emit('online', { message: msg });
            return res.json(msg);
        }).catch((err)=>{
          console.log(err.message)
        })
      } else {
       // console.log(con, 76)
        const newCon = new Conversation({
          users: quarry,
          starter: req.user.id,
          type:'oneToOne',
        })
        newCon.save().then((nc) => {
          const newMessage = new Message({ 
            users : quarry,
            message :{ text : req.body.text, media:allimg},
            sender: req.user.id,
            conversationId:nc._id
          })
          newMessage.save().then(msg => {
            nc.lastMessage = msg._id
            nc.save().then(() => {
              return res.json( msg );
            })
aq            })
        })
      }
    }).catch((er) => {
      console.log(er.message)
    })
  
  } catch (err) {
    console.log(err.message)
    return genError(res, err.message, 400);
  }
});

// @route   GET api/Message/Messages
// @desc    get Message record of a current user
// @access  GET
router.get("/conversations/:id", passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    let records = await Message.find( {conversationId:req.params.id}).populate('users', ['name', '_id', 'userImageData']).sort( { date: 1 } )
    .limit(500)
    return res.status(200).json(records);
  } catch (err) {
    console.log(err.message)
    return genError(res, err.message, 400);
  }
});

router.delete('/delete-message/:id', passport.authenticate( 'jwt', { session: false } ), async (req, res) => {

  Message.findByIdAndDelete(req.params.id).then(()=>{
      return  res.status(200).json({message: 'deleted'});
    }).catch(err=>{
      console.log(err.message)
      return  res.status(500).json({message: 'not deleted'});
    })
});

router.get('/message', passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
   try {


     Conversation.find({users:{$in:[req.user.id]}})
       .populate('lastMessage').populate('users', ['userImageData', 'userProgres','firstname','secondname','handle', '_id']).then(conversations => {
       
         let sorted = conversations.slice().sort((a, b) => b.lastMessage.created - a.lastMessage.created);
        // console.log(sorted, '==================')
         return  res.send(sorted)
     })

    const user = await User.findOne({_id : req.user.id}).populate( 'following.user').then(u=>{
      function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    })
                 // let sorted = all.slice().sort((a, b)=>   b.created - a.created )
                 // return  res.send(sorted);
    } catch (err) {
          console.log(err + ' Message  ==========')
           return genError(res, err.message);

    }
})

router.post('/message_seen' , passport.authenticate( 'jwt', { session: false } ), async (req, res, next) => {
  try {
   //let all = []
   //console.log(req.body.user_id )
    await Message.findOne({ $and: [{ users: req.user.id }, { users: req.body.user_id }] },).sort({date:1}).then(msg => {
      if(!msg){
        console.log('not found', msg )
        return next()
      }
      console.log('found', msg )
      if (msg.sender.toString() === req.user.id.toString()) {
       // console.log('same person')
        return next()
      } else {
        msg.seen = true;
        msg.save().then(e => {
          return next()
        //  console.log(e)
        })
       
      }
    })
  } catch (err) {
    console.log(err)
  }
})

router.post('/start_conversation' , passport.authenticate( 'jwt', { session: false } ), async (req, res, next) => {
  try {
    const quarry = [mongoose.Types.ObjectId(req.user.id), mongoose.Types.ObjectId(req.body.id)]
    const newCon = new Conversation({
    users: quarry,
    starter: req.user.id,
    type:'oneToOne'
    })
   
    Conversation.findOne({ $and: [{ users: req.user.id }, { users: req.params.id }], type: 'oneToOne' }).then((con) => {
      if (con) {
        return res.status(200).json(con);
      }
      newCon.save().then((nc) => {
        console.log(nc)
        const newMessage = new Message({ 
          users : quarry,
          message :{ text : `started a conversation`, media:[]},
          sender: req.user.id,
          conversationId: nc._id,
          system:true
        })
        newMessage.save().then((msg => {
          nc.lastMessage = msg._id;
          nc.save().then(uc => {
            return   res.status(200).json(uc);
          })
        })) 
     })
    })
    
  } catch (err) {
    console.log(err)
  }
})

router.get('/get_conversation/:id' , passport.authenticate( 'jwt', { session: false } ), async (req, res, next) => {
  try {
   let conversation = {}
    Conversation.findOne({ $and: [{ users: req.user.id }, { users: req.params.id }], type: 'oneToOne' }).populate('users').then((con) => {
      if (con) {
        conversation.data = con
        conversation.available = true
        return res.status(200).json(conversation);
      }
       conversation.available = false
      console.log(conversation)
      return   res.status(200).json(conversation);
    }).catch(err => {
      conversation.available = false
      console.log(err.message)
      return   res.status(404).json(conversation);
    })
  } catch (err) {
    
    console.log(er.message)
    return res.status(400);
  }
})

router.post('/block_conversation' , passport.authenticate( 'jwt', { session: false } ), async (req, res, next) => {
  try {
    const quarry = [mongoose.Types.ObjectId(req.user.id), mongoose.Types.ObjectId(req.body.id)]
    const newCon = new Conversation({
    users: quarry,
    starter: req.user.id,
    type:'oneToOne'
  })
    newCon.save().then((nc) => {
      console.log(nc)
    return   res.status(200).json(nc);
   })
  } catch (err) {
    console.log(err)
  }
})
module.exports =  router


//const all =  [ ...followingusers, ...followersusers];
//let sorted = all.slice().sort((a, b)=>   b.created - a.created )

 /***    const user = await User.findOne({_id : req.user.id}).populate( 'following.user')
            
              user.following.map((f)=>{
              // if(f.user._id.toString() !== req.user.id.toString()){
                Message.findOne( {$and :[{users :req.user.id}, {users :f.user._id}]}).populate('users', ['name', '_id']).sort( { date: -1 } )
                .limit(1).then(message=>{
                  let d= dateGen(message.createdAt)
                  followingusers.push({
                    id : f.user._id,
                    firstname : f.user.firstname,
                    secondname : f.user.secondname,
                    handle : `@${f.user.handle}`,
                    img : f.user.userImageData,
                    status : f.user.userProgress,
                    message:message.message.text || message? message.message.text :'...',
                    date:d,
                    created:message.createdAt
                  })
                  return followersusers
                }).catch(e=>{
                  console.log('--------',e.message)
                })
              //  console.log('--------',message)
              // }
              // console.log(d) 
              return followingusers
            });
            const user2 = await User.findOne({_id : req.user.id}).populate( 'followers.user',)
            user2.followers.map( f =>{
              // if(f.user._id.toString() !== req.user.id.toString()){
              Message.findOne( {$and :[{users :req.user.id}, {users :f.user._id}]}).populate('sender', ['userImageData', 'userProgres','firstname','secondname','handle', '_id']).sort( { date: -1 } )
                .limit(1).then(message=>{
                  let d= dateGen(message.createdAt)
                //console.log(message.message.text)
                console.log(message)
                  followersusers.push({
                    id : f.user._id,
                    firstname : f.user.firstname,
                    secondname : f.user.secondname,
                    handle : `@${f.user.handle}`,
                    img : f.user.userImageData,
                    status : f.user.userProgress,
                    message:message.message.text || message? message.message.text :'...',
                    date:d,
                    created:message.createdAt
                  })

                  return followersusers
                }).catch(e=>{
                  console.log('--------',e.message)
                })

              // }
               return followersusers
              
              })

             // return sorted
             const all =  [ ...followingusers, ...followersusers];
            let sorted = all.slice().sort((a, b)=>   b.created - a.created )
        return  res.send(sorted);*/