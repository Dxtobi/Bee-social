import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles , follow , unfollow} from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

  componentDidMount(){
      this.props.getProfiles();
  }
 handlefollow = (id) =>{
  
  this.props.follow(id);
 // window.location.href = '/profiles'
 }
 handleunfollow = (id) =>{
  
  this.props.unfollow(id)
 // window.location.href = '/profiles'
 }
  render () {

    const { profiles, loading } = this.props.profile;
    const { auth } = this.props;
    let profileItems;

      if(profiles === null || loading){
        profileItems = <Spinner/>;
      }else{
        if(profiles.length > 0){
          profileItems = profiles.map( profile => (
            <ProfileItem key={profile._id} profile={profile} profileUser={auth.user.id} unfollow={this.handleunfollow} follow={this.handlefollow}/>
          ))
        }else{
          profileItems = <h4>No profiles found...</h4>;
        }
      }

    return (
      <div className="profiles">
      
          <div className="">
          <h4 className="">PIPERS</h4>
            { profileItems }
          </div>
        
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, {follow, unfollow, getProfiles})(Profiles);
