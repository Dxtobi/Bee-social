import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import { getUserPost} from "../../actions/postsActions";
import { Avatar } from '@material-ui/core';
import SinglePost from '../post/singlePost';

class Dashboard extends Component {
  state={
    loading:true,
    profile:{},
    posts:[],
    following: [],
    followers:[]
  }
  componentWillMount() {
  //  console.log('mounted')
     this.props.getCurrentProfile();
     this.props.getUserPost(this.props.auth.user.id)
  }

  componentWillReceiveProps(np){
    if(np.profile.profile && !np.profile.loading){
      console.log(np)
      this.setState({profile:np.profile.profile, loading:false})
    }
    if(np.profile.profile.followers){
      console.log(np)
      this.setState({following:np.profile.profile.following})
    }
    if(np.profile.profile.followers){
      console.log(np)
      this.setState({followers:np.profile.profile.followers})
    }
    if(np.posts.posts){
       this.setState({posts:np.posts.posts})
    }
  }
  onDeleteClick(e){
    this.props.deleteAccount();
  }

  render() {
    
    //const { user } = this.props.auth;
    const { profile, loading, posts, followers, following} = this.state;
    //const { posts } = this.props.posts;
    console.log(profile)

    return(
      <div className="dashboard">
        {!loading ? (
            <div className='top-container'>
                <div className='image-container'>
                 <Avatar style={{width: 80,  height: 80}} variant =  'circle' src={`/${profile.userImageData}`} alt={profile.name}  className='image-tag' />
                  <div className="name">
                    {`${profile.firstname} ${profile.secondname}`}{`@${profile.handle}`}
                  </div>
                </div>
                <div>
                    <div className = 'bio'>{profile.bio === 'undefined' || profile.bio === undefined ? null: profile.bio}</div>
                    <div style={{fontSize: 14}}>{profile.email}</div>
                    <div style={{fontSize: 14}}>{profile.phone}</div>
              <div style={{ fontSize: 14 }}>{profile.website === 'undefined' || profile.website === undefined ? null : profile.website}</div>
               <Link to="/edit-profile" className="">
                  Edit Profile
              </Link>
                </div>
                <div className = 'v-spacer'/>
            </div>
          ) :(<Spinner/>)
        }
         
         <ProfileActions/>
        <div className="dashboard-footer">
        {
          !loading ? (
          <div className='navbar-holder'>
              <ul className="nav lownav" >

                <li className="list-item"><div className="">{posts.length}</div><div className="">post</div></li>

                <div className='v-spacer'/>
                <li className="list-item"><div className="">{followers.length}</div><div className="">followers</div></li>
 
                <div className='v-spacer'/>
                <li className="list-item"><div className="">{following.length}</div><div className="">following</div></li>
              </ul>
          </div>) :(<Spinner/>)
        }
        </div>
        <div className="main-content">
             
              {!this.props.posts.loading?(
                <div className="main-content">
                 { posts.length >0 ? posts.map( post => <SinglePost key={post._id} post={post}/>): <p style={{textAlign:'center'}}>no posts</p>}
                </div>
              ):(<Spinner/>)
              }
        </div>

       

       
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getUserPost:PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  posts: state.post,
  auth: state.auth
})

export default connect( mapStateToProps, { getUserPost,getCurrentProfile, deleteAccount } )( Dashboard );
