const express = require('express');
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const User = require("../../models/User");
const Group = require("../../models/Group");
const Conversation = require("../../models/Conversation");
const genError = require("../../utils/generateError");
const dateGen = require('../../utils/dateGenerator')
const multer = require('multer');

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
     limits: {fileSize:1024*1024*5}, 
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
module.exports = (io) => {

  let socketFun = {}
  var connectedUsers = {}
  //declearing all socket function for post

  io.of('/conversation').on('connection', function(socket) {
    console.log('20 connected to conversation', socket.id)
    socket.emit('ID', socket.id)
    socket.on('USER_ID', userid =>{
      connectedUsers[userid] = socket.id
     // console.log('24 connected to conversation', socket.id)
    })
    socketFun = {
          newGroupMessageEvent : (event, data)=>{ 
              socket.broadcast.emit(event, data)
          },
          newPrivateMessageEvent : (USER_ID, data)=>{ 
            //let idstostrin = `${event}-${from_username}-message`
          // console.log(data)
             socket.to(`${connectedUsers[USER_ID]}`).emit("MESSAGE", data);
             console.log('=====34======', data.message.text, socket.id, 'sending to',  connectedUsers[USER_ID])
            //connectedUsers[USER_ID].emit('MESSAGE', data);
           // io.to(`${connectedUsers[event]}`).emit(idstostrin, data)
          },
      }
    socket.on('disconnect', ()=>{
     // console.log('disconnected==', socket.id)
      socket.disconnect()
    })

    socket.on('SEND', (msg)=>{
     // console.log(msg,socket.id,'==========',connectedUsers[msg.to])
      socket.to(`${connectedUsers[msg.to]}`).emit("MESSAGE", msg);
     })
    //  console.log('new connection  ' + socket.id);
  });
// @route   POST api/conversation/send-message
// @desc    send message
// @access  POST
router.post("/send-message", upload.array('msgimg'), passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
  //console.log(req.body)
  //console.log(req.files.length)
  let allimg = pushImgs(req.files)
  
 //  const userA = await User.findById(req.user.id);
    ///const userB = await User.findById(req.body.id);

    const quarry = [mongoose.Types.ObjectId(req.user.id),  mongoose.Types.ObjectId(req.body.id)]
    let message_content ={ 
      users : quarry,
      message :{ text : req.body.text, media:allimg},
      sender : req.user.id,
      
    }
   // console.log(message_content)
    const newMessage = new Conversation(message_content)
    newMessage.save().then(msg=>{
        //console.log(msg)
        //socketFun.newPrivateMessageEvent(userB._id, msg);
        //req.notification.messageNotification(userB._id);
        return res.json( msg );
    })
     

//await conversationA.save().then(msg=>{
  //   return res.json( msg );
//})
   // req.notification.messageNotification(userB._id);

   
  } catch (err) {
    console.log(err.message)
    return genError(res, err.message, 400);
  }
});

// @route   GET api/conversation/conversations
// @desc    get conversation record of a current user
// @access  GET
router.get("/conversations/:id", passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
      
   // console.log(req.user.id +"==="+ req.params.id)
    //const quarry = [{user:mongoose.Types.ObjectId(req.user.id)},{user: mongoose.Types.ObjectId(req.params.id)}]
  //  const quarry = [mongoose.Types.ObjectId(req.user.id), mongoose.Types.ObjectId(req.params.id)]
  //console.log(quarry)
    let records = await Conversation.find( {$and :[{users :req.user.id}, {users :req.params.id}]}).populate('users', ['name', '_id'])
    
   // console.log(records)
    return res.status(200).json( records );
  } catch (err) {
    console.log(err.message)
    return genError(res, err.message, 400);
  }
});

router.delete('/delete-message/:id', passport.authenticate( 'jwt', { session: false } ), async (req, res) => {

  Conversation.findByIdAndDelete(req.params.id).then(()=>{
      return  res.status(200).json({message: 'deleted'});
    }).catch(err=>{
      console.log(err.message)
      return  res.status(500).json({message: 'not deleted'});
    })
});

router.get('/message' , passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
   try {
    let all = []
    const user = await User.findOne({_id : req.user.id}).populate( 'following.user').then(u=>{
      function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
      
      
      let usersinlnt = u.following.length
      let userlnt = u.following.length
      u.following.map((x)=>{
        //console.log(x)
        Conversation.findOne( {$and :[{users :req.user.id}, {users :x.user._id}]})
        .populate('sender', ['userImageData', 'userProgres','firstname','secondname','handle', '_id'])
        .sort( { date: -1 } ).limit(1).then((message)=>{
         
         if(message){
            all.push({
              id : x.user._id,
              firstname : x.user.firstname,
              secondname : x.user.secondname,
              handle : x.user.handle,
              img : x.user.userImageData,
              messageimg:message.message.media[0],
              status : x.user.userProgress,
              message:message.message.text || message? truncateString(message.message.text, 12) :'',
              date:dateGen(message.createdAt),
              messageHandle:message.sender.handle,
              created:message.createdAt,
              sender:message.sender._id
            })
           
           

         }
          userlnt--
          //let d= 
          return all
          
        }).then(e=>{
           if (usersinlnt - userlnt === usersinlnt) {
            //console.log('done',all.length)
            let sorted = all.slice().sort((a, b)=>   b.created - a.created )
            return  res.send(sorted)
            // console.log('done',all.length)
           } else {
             return
           // console.log('not done')
           }
        //  console.log('===========4444444444444444444444444====================,',all,e)
        })

       })

    })
                 // let sorted = all.slice().sort((a, b)=>   b.created - a.created )
                 // return  res.send(sorted);
    } catch (err) {
          console.log(err + ' conversation  ==========')
           return genError(res, err.message);

    }
})
 return router
}

//const all =  [ ...followingusers, ...followersusers];
//let sorted = all.slice().sort((a, b)=>   b.created - a.created )

 /***    const user = await User.findOne({_id : req.user.id}).populate( 'following.user')
            
              user.following.map((f)=>{
              // if(f.user._id.toString() !== req.user.id.toString()){
                Conversation.findOne( {$and :[{users :req.user.id}, {users :f.user._id}]}).populate('users', ['name', '_id']).sort( { date: -1 } )
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
              Conversation.findOne( {$and :[{users :req.user.id}, {users :f.user._id}]}).populate('sender', ['userImageData', 'userProgres','firstname','secondname','handle', '_id']).sort( { date: -1 } )
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