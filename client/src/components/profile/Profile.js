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


class Profile extends Component {
    state = { 
        following_class:false,
        follower:false,
        following: [],
        followers: [],
        loading: false,
        posts:[]
      }
componentWillMount(){
    this.props.getProfileByHandle(this.props.match.params.id)
    this.props.getUserPost(this.props.match.params.id)
}

componentWillReceiveProps(newprops){
    console.log(newprops.profile.profile)
    if(newprops.profile.loading === false && newprops.profile.profile.user ){
        this.setState({
            posts: this.props.post.posts,
            following: newprops.profile.profile.user.following ? newprops.profile.profile.user.following :[],
            followers: newprops.profile.profile.user.followers ? newprops.profile.profile.user.followers:[],
            loading: false
        })
       
        if(newprops.profile.profile.user.followers){
          console.log(true)
            this.setState({following_class:this.findProfileFollow(newprops.profile.profile.user.followers, newprops.auth.user.id, 'wers')})
        }
        if(newprops.profile.profile.user.following){
            console.log(true)
            this.setState({follower:this.findProfileFollow(newprops.profile.profile.user.following, newprops.auth.user.id, 'ing')})
        }
        if(this.props.match.params.id.toString() === newprops.auth.user.id.toString()){
            this.props.history.push('/dashboard')
        }
    } else {
        this.setState({loading:true})
    }
    
}

findProfileFollow(follow, userId, n){
    //const { auth } = this.props;
    console.log(follow, userId, n)
    if(follow.length > 0){
      if(follow.filter(e => e.user._id.toString() === userId).length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
        return false
    }
}

  


tugleFollow =()=>{
    this.setState({
        following_class : !this.state.following_class
    })
}

    handlefollow = () => {
   
    const { profile } = this.props.profile;
        this.tugleFollow()
        //console.log(profile)
     this.props.follow(profile.user._id)
}
handleunfollow=()=>{
    const { profile } = this.props.profile;
    this.tugleFollow()
     this.props.unfollow(profile.user._id)
}


render(){

    const { profile } = this.props.profile;
    const { following, followers, loading } = this.state;
    const { posts } = this.props.post;
    const allPost = [...posts]
    let dashboardContent;




if( profile.user === undefined || loading  ) {
    dashboardContent = <Spinner/>
} else {
    
    // Check if logged in user has profile data
    if( Object.keys( profile ).length > 0 ){
 
        dashboardContent=(
         <div>
            <div className='top-container'>
                <div className='image-container'>
                <Avatar style={{width: 80,  height: 80}} variant =  'circle' src={`/${profile.user.userImageData}`} alt={profile.user.handle}  className='image-tag' />
                <div className="name">{`${profile.user.firstname} ${profile.user.secondname}`}</div>
                 <div className="name"><small style={{fontSize: 13}}>{`@${profile.user.handle.toLowerCase()}`}</small></div>
                </div>
                <div>
                        {profile.user.bio === undefined || profile.user.bio === 'undefined' ? null : <div className='bio'>{ profile.user.bio}</div> }
                    <div style={{fontSize: 14}}>{profile.user.email}</div>
                    <div style={{fontSize: 14}}>{profile.user.phone === '0' || profile.user.phone === 0? null : profile.user.phone}</div>
                </div>
                
                <div className = 'v-spacer'/>
                
            </div>

                    
            <div  style={{display:'flex'}}>
                    {  this.state.following_class ? <div className='btn-add-follow unfollow' style={{width:150, textAlign:'center'}} onClick={this.handleunfollow}>Unfollow</div>:
                     <div  className='btn-add-follow' style={{width:150, textAlign:'center'}} onClick={ this.handlefollow }>Follow</div> 
                    }
                     <div className = 'v-spacer'/>
                     <Link to={`/conversations/${profile.user._id}` } className='message-icon'><FiMail/></Link>
                     <div className = 'v-spacer'/>
                    {
                        this.state.follower?<small className='small'>following</small>:null
                    }
            </div>
            <div className="dashboard-footer">
                <div className='navbar-holder'>
                        <ul className="nav lownav" >

                        <li className="list-item"><div className="">post</div><div className="">{posts.length}</div></li>

                        <div className='v-spacer'/>
                        <li className="list-item"><div className="">followers</div><div className="">{followers.length}</div></li>

                        <div className='v-spacer'/>
                        <li className="list-item"><div className="">following</div><div className="">{following.length}</div></li>
                        </ul>
                </div>
            </div>
            <div className="main-content">
                
                <div className="main-content">
                        {
                            allPost.map(post => <SingleItem key={post._id} post={post} />)
                        }
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
 )}
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