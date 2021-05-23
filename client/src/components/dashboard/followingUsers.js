import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const FollowingUser = ({ user }) => {
 // console.log(user)
  return (
    
     
        <Link to={`/profile/${user.user._id}`}>
         <div className="singleUser" >
            <Avatar src={`/${user.user.userImageData}`}/>
            <div>{user.user.handle}</div>
         </div>
        </Link>
      
   
  )
}

export default FollowingUser;
