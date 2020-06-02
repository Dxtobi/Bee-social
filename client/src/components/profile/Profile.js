import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getUserPost} from '../../actions/postsActions'
import SingleItem from '../post/singlePost'
import { follow , unfollow,  getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
//import {} from '../../actions/profileActions';
import './profile_single.css'
import {FiMail} from 'react-icons/fi'
import { Avatar } from '@material-ui/core';
import FollowingUser from '../dashboard/followingUsers';

class Profile extends Component {
    state = { 
        following_class:false,
        follower:false,
        following:[]
      }
componentDidMount(){
    this.props.getProfileByHandle(this.props.match.params.id)
    this.props.getUserPost(this.props.match.params.id)
}

componentWillReceiveProps(newprops){
    console.log(newprops)
    if(!newprops.profile.loading){
        this.setState({following:newprops.profile.profile.following})
        if(this.findProfileFollow(newprops.profile.profile.followers, newprops.auth.user.id)){
          
            this.setState({following_class:true})
        }
        if(this.findProfileFollow(newprops.profile.profile.following, newprops.auth.user.id)){
          
            this.setState({follower:true})
        }
        if(newprops.profile.profile._id.toString() === newprops.auth.user.id.toString()){
            this.props.history.push('/dashboard')
        }
    }
    
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

  


tugleFollow =()=>{
    this.setState({
        following_class : !this.state.following_class
    })
}

handlefollow=()=>{
    const { profile } = this.props.profile;
    this.tugleFollow()
     this.props.follow(profile._id)
}
handleunfollow=()=>{
    const { profile } = this.props.profile;
    this.tugleFollow()
     this.props.unfollow(profile._id)
}


render(){

const { profile, loading } = this.props.profile;
//console.log(profile)
const { posts } = this.props.post;
let dashboardContent;
//let profileImg;

let followers = 0;
let following = 0;

if( profile === null || loading  ) {
    dashboardContent = <Spinner/>
} else {
    
    // Check if logged in user has profile data
    if( Object.keys( profile ).length > 0 ){
      
        
        
      
      if(profile.posts){
        if(profile.followers.length > 1000)
        { followers = profile.followers.length/1000 + 'K' }else{followers = profile.followers.length}
        if(profile.following.length > 1000)
        { following = profile.following.length/1000 + 'K' }else{following = profile.following.length}
      }
      
        dashboardContent=(
         <div>
            <div className='top-container'>
                <div className='image-container'>
                <Avatar style={{width: 80,  height: 80}} variant =  'circle' src={`/${profile.userImageData}`} alt={profile.name}  className='image-tag' />
                <div className="name">{`${profile.firstname} ${profile.secondname}`}</div>
                 <div className="name"><small style={{fontSize: 13}}>{`@${profile.handle.toLowerCase()}`}</small></div>
                </div>
                <div>
                    <div className = 'bio'>{profile.bio === 'undefined' || profile.bio === undefined? null: profile.bio}</div>
                    <div style={{fontSize: 14}}>{profile.email}</div>
                    <div style={{fontSize: 14}}>{profile.phone === '0' || profile.phone === 0? null : profile.phone}</div>
                    <div style={{fontSize: 14}}>{profile.website === 'undefined' || profile.website === undefined? null:profile.website}</div>
                </div>
                
                <div className = 'v-spacer'/>
                
            </div>

                    
            <div  style={{display:'flex'}}>
                    {  this.state.following_class ? <div className='btn-add-follow unfollow' style={{width:150, textAlign:'center'}} onClick={this.handleunfollow}>Unfollow</div>:
                     <div  className='btn-add-follow' style={{width:150, textAlign:'center'}} onClick={ this.handlefollow }>Follow</div> 
                    }
                     <div className = 'v-spacer'/>
                     <Link to={`/conversations/${profile._id}` } className='message-icon'><FiMail/></Link>
                     <div className = 'v-spacer'/>
                    {
                        this.state.follower?<small className='small'>following</small>:null
                    }
            </div>
            <div className="followingAndFollowers">
                        {
                            this.state.following.map((user, i) =>{
                            return <FollowingUser key={i} user = {user.user} />
                            })
                        }
            </div>
            <div className="dashboard-footer">
                <div className='navbar-holder'>
                        <ul className="nav lownav" >

                        <li className="list-item"><div className="">post</div><div className="">{profile.posts}</div></li>

                        <div className='v-spacer'/>
                        <li className="list-item"><div className="">followers</div><div className="">{followers}</div></li>

                        <div className='v-spacer'/>
                        <li className="list-item"><div className="">following</div><div className="">{following}</div></li>
                        </ul>
                </div>
            </div>
            <div className="main-content">
                
                <div className="main-content">
                { posts.map( post => <SingleItem key={post._id} post={post}/>)}
                </div>
            </div>
        </div>
        )
    } else {
      dashboardContent = (
        <div className="dashboard-container">
         <Spinner/>
        </div>
      )

  
    }
}

 
 return(
  <div className="dashboard">
     <button onClick={e=>this.props.history.goBack()} className="btn-normal">Go Back</button>
     {dashboardContent}
  </div>
)

}
}



Profile.propTypes = {
    getUserPost:PropTypes.func.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    post :state.post
})

export default connect(mapStateToProps, { follow, unfollow,getUserPost, getProfileByHandle })(Profile);