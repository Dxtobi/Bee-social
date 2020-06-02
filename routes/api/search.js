const router = require("express").Router();
const _ = require("lodash");
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const genError = require("../../utils/generateError");
//const authenticate = require("../../middleware/authenticate");

const User = require("../../models/User");
const Group = require("../../models/Group");
const Post = require("../../models/Post");
// @route   GET api/search
// @desc    Show search result
// @access  GET
router.get("/",passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    const user = await User.find()
    .lean()
    .exec();

  const groups = await Group.find()
    .select("name info groupImage _id")
    .lean()
    .exec();

    const posts = await Post.find()
    .populate( 'user', 
         ['profileImageData', 'firstname', 'secondname' , 'handle', '_id' ] )
    .lean()
    .exec();

    const profileSearch = user.reduce((acc, user) => {
      if (user._id.toString() !== req.user.id.toString()) {
        acc.push({
          name: `${user.firstname} ${user.secondname}`,
          handle_link: `/profile/${user._id}`,
          handle: user.handle,
          image: user.userImageData,
          is: "User"
        });
      }
      return acc;
    }, []);
  
    const groupSearch = groups.map(group => {
      return {
        name: group.name,
        handle_link: `/groupchat/${group._id}`,
        handle: group.name,
        image: group.groupImage,
        is: "Group"
      };
    });
    const postSearch = posts.map(post => {
      return {
        post:post,
        is: "Post"
      };
    });
  const shuffled = _.shuffle([...profileSearch, ...groupSearch, ...postSearch]);
  res.status(200).send(shuffled);
  } catch (err) {
    console.log(err + '==========')
    return genError(res, err.message);
  }
});
router.get("/searching/:searchvalue", passport.authenticate( 'jwt', { session: false } ), async (req, res) => {
  try {
    console.log(req.params.searchvalue)
    let seachRegex = new RegExp(`^${req.params.searchvalue}`, 'gi')
    const user = await User.find({$or:[
      {firstname:seachRegex},
      {secondname:seachRegex},
      {handlename:seachRegex},
    ]})
    .lean()
    .exec();

  const groups = await Group.find({$or:[
    {name:seachRegex},
    {info:seachRegex},
  ]})
    .select("name info groupImage _id")
    .lean()
    .exec();

    const posts = await Post.find({$or:[
      {tags:{$in : seachRegex}},
      {text:seachRegex},
    ]})
    .populate( 'user', 
         ['profileImageData', 'firstname', 'secondname' , 'handle', '_id' ] )
    .lean()
    .exec();

  const profileSearch = user.reduce((acc, user) => {
    if (user._id.toString() !== req.user.id.toString()) {
      acc.push({
        name: `${user.firstname} ${user.secondname}`,
        handle_link: `/profile/${user._id}`,
        handle: user.handle,
        image: user.userImageData,
        is: "User"
      });
    }
    return acc;
  }, []);

  const groupSearch = groups.map(group => {
    return {
      name: group.name,
      handle_link: `/groupchat/${group._id}`,
      handle: group.name,
      image: group.groupImage,
      is: "Group"
    };
  });
  const postSearch = posts.map(post => {
    return {
      post:post,
      is: "Post"
    };
  });
  
  const shuffled = _.shuffle([...profileSearch, ...groupSearch, ...postSearch]);
  console.log(shuffled)
  res.status(200).send(shuffled);
  } catch (err) {
    console.log(err + '==========')
    return genError(res, err.message);
  }
});

module.exports = router;
