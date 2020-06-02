import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    
      <div className="btn-group-role" style={{display: 'flex'}} >
        <Link to="/edit-profile" className="btn-add-experience">
            Edit Profile
        </Link>
        <Link to="/followers" className="btn-add-experience">
            People you know
        </Link>
      </div>
   
  )
}

export default ProfileActions;
