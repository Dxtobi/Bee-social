import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import isEmpty from '../../validation/is-empty';




class ProfileItem extends Component{
  state = {
    follow : 'Follow'
  }
  findProfileFollow(follow, userId){
    //const { auth } = this.props;
    if(follow.length > 0){
      if(follow.filter(e => e.user === userId).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }


  render() {
     
    const { profile, follow , profileUser, unfollow} = this.props;
    //console.log('PROFILE: '+this.props.profile);
      let profileImg;
      let isfollowing
    if (this.findProfileFollow(profile.followers, profileUser)) {
        isfollowing = <div className=" btn-following profile_list_item settop5" onClick={()=>unfollow(profile._id)}>Unfollow</div>
    } else {
     // console.log(profile.followers);
      isfollowing = <div  className="btn-follow profile_list_item settop5" onClick={()=>follow(profile._id)}>Follow</div>
    }





      if(profile.profileImageData){
        profileImg = <img src={profile.profileImageData} alt='.'  />
      }else{
        
        profileImg = <Link to={`/profile/${profile.handle}`}><img src='/assets/images/avatar.png' alt='.'  /></Link>
      }
    return (
      <div className="profile_list">
         <Link  className = 'a-tag' to={`/profile/${profile._id}`}>
          <div className='imgandname'>
              <div className=" profile_list_item ">
               
                  <div className="profile_img">{profileImg}</div>
               
              </div>
              <div className=" profile_list_item ">
                {profile.name}<br />
                <small>{profile.handle}</small>
              </div>
           </div>
        </Link>
            
            <div className='v-spacer'/>
            {isfollowing}
        
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
 // findProfileFollow: PropTypes.func.isRequired,
}

export default ProfileItem;
