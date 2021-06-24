const router = require("express").Router();
const _ = require("lodash");

const User = require("../../models/User");
const GroupMsg = require("../../models/message");
const Group = require("../../models/Group");
const Post = require("../../models/Post");
const passport = require( 'passport' );
const validateGroup = require("../../validation/group");
const genError = require("../../utils/generateError");
//const authenticate = require("../../middleware/authenticate");
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




  // @route   GET api/group/:id user_joined
// @desc    GEt a single group
// @access  GET
router.get("/:id", passport.authenticate( 'jwt', { session: false } ),  async (req, res) => {
  try {
    let errors = {};

    const group = await Group.findById(req.params.id)
      .populate('members', '_id userImageData name handle')
      .populate('admins', '_id userImageData name handle')
      .lean()
      .exec();

    
    if (!group) {
      errors.message = "Group does not exist";
      return genError(res, errors, 404);
    }else{

      return res.status(200).json(group);
   
    }
    //console.log(group)
    
   // socketFun.hasjoined(group._id, req.user.name)
   
  } catch (err) {
    return genError(res, err.message);
  }
});
// @route   POST api/group/create
// @desc    Create a group
// @access  POST
router.post("/create",  upload.single('gicon') ,passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  const { isValid, errors } = validateGroup(req.body);
  if (!isValid) {
    console.log('error occurd')
    return res.status(400).json(errors);
  }

  try {
    let  gicon 
    if(req.file){
     // console.log(req.file)
      gicon = req.file.path
    }else{
      gicon =''
    }
    let newGroup ={
      name: req.body.gname,
      website: req.body.gwebsite,
      info : req.body.ginfo,
      groupImage : gicon
    }
    const group = await new Group(newGroup);
    group.admins.push(req.user.id);
    group.members.push(req.user.id);
    await group.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        groupsCreated: group._id,
        groupsPartOff: group._id,
      }
    });
    //console.log(newGroup)
    res.status(200).json(group);
  } catch (err) {
    console.log(err.message)
    return  err.message;
  }
});
// @route   POST api/group/send/group/message/:id
// @desc    send a group message
// @access  POST

// @route   POST api/group/edit/:id
// @desc    Create a group
// @access  POST
router.patch("/edit/:id",  upload.single('gicon') ,passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  const { isValid, errors } = validateGroup(req.body);
 // console.log(updateGroup)
  if (!isValid) {
    console.log(errors, 'error occurd')
    return res.status(400).json(errors);
  }

  try {
    const updateGroup = { }
    if(req.file){
     // console.log(req.file)
        updateGroup.groupImage = req.file.path
    }
     
    if( req.body.gname ) updateGroup.name= req.body.gname;
    if( req.body.gwebsite ) updateGroup.website= req.body.gwebsite;
    if( req.body.ginfo ) updateGroup.info = req.body.ginfo;

   // console.log(updateGroup)
        Group.findOneAndUpdate({
          _id: req.params.id
         },
          { $set :
            updateGroup
           }
         ).then(group=>{

            res.status(200).json(group);

         }).catch(err=>{

             console.log(err.message)

         })
    
    //console.log(newGroup)
  } catch (err) {
    console.log(err.message)
    return  err.message;
  }
});
router.post("/send/group/message/:id",  upload.single('mesage-file') ,passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
 // const { isValid, errors } = validateGroup(req.body);
  //if (!isValid) {
  //  return res.status(400).json(errors);
  //}

  try {
    let  msgfile
    if(req.file){
      msgfile = req.file.path
    }
    let message = {
      message:{ text : req.body.msg,
               file : msgfile
              },
      sender:req.user.id,
      groupid:req.params.id
    }
    
    let gmesage = new GroupMsg(message)
    await gmesage.save().then(async msg=>{
       let saved_message = await GroupMsg.findById(msg._id)
      .populate('sender', '_id firstname secondname handle userImageData')
      .lean()
      .exec();
    //  console.log(saved_message)
      socketFun.newGroupMessageEvent(req.params.id, saved_message)
      return res.status(200).json(message);
    });

    
  } catch (err) {
    console.log(err.message)
    return  err.message;
  }
});

// @route   GET api/group/grt/group/message/:id
// @desc    get group message
// @access  POST
router.get("/get/group/message/:id",  passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  

  try {
 
   
   
       let messages = await GroupMsg.find({groupid :req.params.id})
      .populate('sender', '_id firstname secondname handle userImageData')
      .lean()
      .exec();


      //console.log(messages)
     
      return res.status(200).json(messages);
    

    
  } catch (err) {
    console.log(err.message)
    return  err.message;
  }
});
// @route   PATCH api/group/joingroup/:id
// @desc    Create a group
// @access  POST
router.patch("/joingroup/:id" ,passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  //const { isValid, errors } = validateGroup(req.body);


  try {
    let add = true
    const this_group = await Group.findById(req.params.id)
    this_group.members.map(user =>{
       console.log(user, req.user.id.toString())
        if(user.toString() === req.user.id.toString() )
        {
            add = false
            console.log('already following')
            return add, res.status(404).json('already following');
        }
     });


    if(add){
      const group = await Group.findByIdAndUpdate(req.params.id, {
        $push: {
          members: req.user.id,
        }
      });
      const message = await GroupMsg.find({group:req.params.id})
        .populate('sender', '_id userImageData firstname secondname handle')
        .lean()
        .exec();
      await group.save().then(group=>{
        req.notification.groupNotification(group, req.user)
       // console.log('joined')
          res.status(200).json({group, message});
      })
    }
    
    
  } catch (err) {
    console.log(err.message)
    return  err.message;
  }
});

// @route   DELETE api/group/delete/:groupId
// @desc    Delete a group
// @access  DELETE
router.delete("/delete/:groupId",  passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    let canDelete = false;
    let errors = {};

    const { groupId } = req.params;

    const group = await Group.findById(groupId).exec();

    if (!group) {
      errors.message = "Group does not exist";
      return genError(res, errors, 404);
    }

    group.admins.forEach(id => {
      if (id.toString() === req.user._id.toString()) {
        canDelete = true;
      }
    });

    if (!canDelete) {
      errors.message = "You cannot delete this group";
      return genError(res, errors, 401);
    }

    await group.delete();

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        groupsCreated: group._id
      }
    })
      .lean()
      .exec();

    return res.status(200).json({ message: "Group deleted" });
  } catch (err) {
    return genError(res, err.message);
  }
});

// @route   GET api/group/all
// @desc    Get all the groups
// @access  GET
router.get("/",   passport.authenticate( 'jwt', { session: false } ),async (req, res) => {
  try {
    console.log('hit')
    const groups = await Group.find()
      .populate("admins", "firstname secondname handle _id")
      .lean()
      .exec();

    return res.status(200).json(groups);
  } catch (err) {
    return genError(res, e.message);
  }
});


// @route   GET api/group/current
// @desc    Logged in user all the groups that he exist in
// @access  GET
router.get("/groups/mygroups",   passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    
   // console.log(req.user)
    const groupsPartOff = await Group.find({
      members : {$in : req.user.id}
    })
      .populate('members', '_id firstname secondname handle userImageData')
      .populate('admins', '_id firstname secondname handle userImageData')
      .lean()
      .exec();
      //console.log(groupsPartOff)
    return res.status(200).json({
     // groupsCreated,
      groupsPartOff
    });
    
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

