//const LoggedInUsers = require("../models/LoggedInUsers");
const User = require("../models/User");
//const User = require("../models/User");

module.exports = class Notification {
  constructor(io) {
    this.io = io;

    this.notifcation = this.io.of("notification");
    this.groupntf = this.io.of("group-notification");

    this.groupntf.on("connection", socket => {
      this.socket = socket;
      console.log("User Connected");
      this.socket.on('joined', socket =>{
        console.log(socket);
      })
      this.socket.on("disconnect", async () => {
        console.log("disconnect");
        
      });
    });
  
    this.notifcation.on("connection", socket => {
      this.socket = socket;
      console.log("User Connected");

      this.socket.on("disconnect", async () => {
        console.log("disconnect");
        
      });
    });
  }

  
  async repostNotification(){
    
  }

  async likeNotification(usersId, user, poemId) {
    const obj = {
      message: `${name} has created a new poem`,
      link: `/poem/${poemId}`,
      type:'Post'
    };

    await User.updateMany(
      { _id: { $in: usersId } },
      {
        $push: {
          notifications: obj
        }
      }
    );
    const users = await LoggedInUsers.find({ userId: { $in: usersId } });
    users.map(({ socketId }) => {
      this.notifcation.to(socketId).emit("newPoem");
    });
  }
  async commentNotification(usersId, name, poemId) {
    const obj = {
      message: `${name} has created a new poem`,
      link: `/poem/${poemId}`
    };

    await User.updateMany(
      { _id: { $in: usersId } },
      {
        $push: {
          notifications: obj
        }
      }
    );
    const users = await LoggedInUsers.find({ userId: { $in: usersId } });
    users.map(({ socketId }) => {
      this.notifcation.to(socketId).emit("newPoem");
    });
  }

  async followNotification(details) {
    try {
     // const User = await User.findOne({ user: followerId }).lean();

     // console.log(details)
      //io.emit(idstostrin, data)
      
    } catch (err) {
      throw err;
    }
  }

  async adsNotification(user, compname) {
    try {
     // const User = await User.findOne({ user: followerId }).lean();

      const obj = {
        message: `Ads for ${compname} has been submited and its under review`,
        link: `/myAds`,
        type:'Following'
      };

      await User.findByIdAndUpdate(user.id, {
        $push: {
          notifications: obj
        }
      });

      
    } catch (err) {
      throw err;
    }
  }
  async adsConfermNotification(userid, followerdetails) {
    try {
     // const User = await User.findOne({ user: followerId }).lean();
      const obj = {
        message: `${followerdetails.handle} started to follow you`,
        link: `/profile/${followerdetails.id}`,
        type:'Following'
      };

      await User.findByIdAndUpdate(userid, {
        $push: {
          notifications: obj
        }
      });

      
    } catch (err) {
      throw err;
    }
  }

  async messageNotification(userId) {
    console.log('==== mesnotf  to ====', userId)
    const user = await User.findOne({_id: userId })
      .lean()
      .exec();

    if (user) {
      const obj = {
        message: `You recieved a new message`,
        link: `/messages`,
        type : 'Message'
      };

      await User.findByIdAndUpdate(userId, {
        $push: {
          notifications: obj
        }
      }).then(ntf=>console.log('====sent notification====',));
      return;
    }

    this.notifcation.to(user.socketId).emit("newMessage");
  }

  async groupNotification(group, userobj) {
    const obj = {
      message: `${userobj.name} just joined your group`,
      link: `/groupchat/${group._id}`,
      type : 'Group'
    };

    const user = await User.findByIdAndUpdate(
      group.admins[0],
      {
        $push: {
          notifications: obj
        }
      },
      { new: true }
    );
    this.notifcation.to(group.admins[0]).emit("newGroupRequest");
  }
};
