import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const FollowingUser = ({user}) => {
  return (
    
     
        <Link to={`/profile/${user._id}`}>
         <div className="singleUser" >
            <Avatar src={`/${user.userImageData}`}/>
            <div>{user.handle}</div>
         </div>
        </Link>
      
   
  )
}

export default FollowingUser;
