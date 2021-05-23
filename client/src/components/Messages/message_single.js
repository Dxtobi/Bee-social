import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import {RiCheckDoubleLine} from 'react-icons/ri'
import { GoPrimitiveDot } from 'react-icons/go'
//import { dateGen } from '../../utils/dateGenerator';
//import moment from 'moment'


export default function SingleUser( {resiver, user} ){
 // console.log(user.lastMessage.sender)
 // const sender = user.lastMessage.sender
  const otherUser = checkingUsers(user.users, resiver)
  return (
    <Link to={{
      pathname: `/messaging/${user._id}`,
      state: {
          id:otherUser._id
      }
    }}>
      <div className='user-list-holder'>
        <div className='user-list-holder-img-name'>
        <div className='user-list-holder-avatar'>
            <Avatar alt={otherUser.handle} src={otherUser.userImageData} />
          </div>
          <div>
              <div className='user-list-holder-name'>
                {otherUser.handle}
                  <small className='msg_sub'>{user.lastMessage.sender === resiver && 'You:'}  {user.lastMessage.message.text === "" ? ` file` : truncateString(user.lastMessage.message.text, 30)}</small>
              </div>
        </div>
        </div>
        <small className='msg_sub' >{user.lastMessage.seen && user.lastMessage.sender === resiver ? <RiCheckDoubleLine size={24} color='cyan' />
          : user.lastMessage.seen && user.lastMessage.sender !== resiver ? null : <GoPrimitiveDot color={ 'green'}/>}
        </small>
        </div>
    </Link>
  )
}

const truncateString =(str, num) =>{
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

const checkingUsers=(array, currentUserId) =>{
  const user = array.reduce((arr, obj) => {
    if (obj._id !== currentUserId) {
      arr.push(obj)
      return arr
    }
    return arr
   }, [])
  //console.log(user[0])
  return user[0]
}  