module.exports = class WebSockets  {
    

    users = []

    
    connection = (client) => {
        console.log('connected')
        client.on('disconnect', () => {
            this.users = this.users.filter((user) => user.socketId !== client.id);
            //client.emit('offline');
            console.log('disconnected')
        });

        
        
        //add new user
        client.on('identity', (userId) => {
            this.users.push({
                socketId: client.id,
                userId: userId,
            });
           // console.log(this.users);
        });
        //add someone to chat and other users as well(2 users for single chat and more for group);
        client.on('subscribe', async (room, otherUsersId = '') => {
           // this.subscribeOtherUser(room, otherUsersId);
            console.log(client.rooms, 'rooms')
            try {

                let x = await global.io.in(room).fetchSockets();
                console.log(x.length, 'users in this room');
                if (client.rooms[room]) {
                    console.log('already subscribed')
                    return
                } else {
                    client.join(room)

                   console.log('subscribe')
                    client.in(room).emit('in');
                    //global.io.in(room).emit('online',);
                  // console.log(client.rooms)
                }
            } catch (e) {
                console.log('sub error: ',e)
            }
        })

        client.on('unsubscribe', (room) => {
           // this.subscribeOtherUser(room, otherUsersId);
           try {
               client.leave(room)
               client.in(room).emit('out');
            console.log('unsubscribe')
           } catch (error) {
               console.log('[leave room]',error)
           }
            
        })
        client.on('notTyping', (room) => {
            // this.subscribeOtherUser(room, otherUsersId);
            try {
                client.in(room).emit('notTyping');
                console.log('stopped typing...')
            } catch (error) {
                console.log('[stopped typing]',error.message)
            }
             
         })
        client.on('typing', (room) => {
            // this.subscribeOtherUser(room, otherUsersId);
            try {
                client.in(room).emit('typing');
                client.in(room).emit('in');
                console.log('typing...')
            } catch (error) {
                console.log('[typing]',error.message)
            }
             
         })
    }
    subscribeOtherUser = (room, otherUsersId) => {
        // console.log(room, otherUsersId)
        const userSockets = this.users.filter(
            (user) => user.userId === otherUsersId
        );
        console.log(userSockets)
        userSockets.map((userInfo) => {
          console.log(global.io.sockets.connected(userInfo.socketId))
           // const socketConn = global.io.sockets.connected(userInfo.socketId);
           /* if (socketConn) {
                socketConn.join(room)
            }*/
        })
    }
}



