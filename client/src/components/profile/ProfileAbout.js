import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {

    render() {

        const { profile } = this.props;

        // Get FirstName
        const firstName = profile.user.name.trim().split(' ')[0];

       

        return (
            
                <div className="profil-box">
                  <div className="">
                    <p className="lead">
                     {isEmpty(profile.bio) ? (<span>{firstName} has bio</span>) : (<span>{profile.bio}</span>)}
                    </p>
                    <hr />
                  </div>
                </div>
  
        )
    }
}


export default ProfileAbout;