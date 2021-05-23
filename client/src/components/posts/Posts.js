import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import io from 'socket.io-client'
import PostFeeds from './PostFeeds';
import {SpinnerDots} from '../common/Spinner';
//import Spinner from './loadingPost';
import { getPosts } from "../../actions/postsActions";
import {getNotifications} from "../../actions/manageNotifications";
//import { socket } from "../../App";
class Posts extends Component {

 constructor(props){
    super(props);
    
    this.state = { 
       // sidebaropen: false,
        test : '',
        posts :[],
        skip:0,
        profilesPro:[],
        isloadingmore:false,
        error:false
      }

     
 }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps.post.posts)
        if(nextProps.post.posts){
          if(Object.keys(nextProps.post.posts).length > 0 && Object.keys(this.state.posts).length === 0){
            this.setState({posts : nextProps.post.posts, isloadingmore:false})
            
          }
          if(Object.keys(nextProps.post.posts).length > 0 && Object.keys(this.state.posts).length > 0 ){

            
                let all = []
                let post = [...nextProps.post.posts, ...this.state.posts];
                let hash =Object.create(null)
                post.forEach((u)=>{
                  let key = JSON.stringify(u);
                  hash[key] =(hash[key]||0)+1;
                  if(hash[key]>=2){
                    return null
                  }else{
                    return all.push(JSON.parse(key))
                  }
                })
               // this.setState({ posts : all})
            this.setState({posts : all, isloadingmore:false})
           // console.log('got new ones', nextProps.post.posts, this.state.posts)
          }
         
          this.setState({profilesPro :  nextProps.profilesPro})
        }
        if(nextProps.post.posts.length === 0){
          return //console.log('no more post')
        }
    }
    
    componentDidMount() {
   
      this.props.getPosts(this.state.skip);
      const nextSkip = this.state.skip + 5
      this.setState({skip : nextSkip})
   // console.log("old :"+ this.state.skip)
   
   window.onscroll = (e) =>{
    const{
       state : { 
       error,
       skip,
       isloadingmore
     }} = this
    if(error || isloadingmore ){
      return
    }else{
      if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        // console.log('yess')
         this.loadMore(skip)
      }
    }
  }
    }

    componentWillUnmount() {
     // let socket = io()
     //io.Socket.close()
    }

   loadMore =(skip)=>{
    this.props.getPosts(skip);
     const nextSkip = this.state.skip + 5
     this.props.getNotifications()
    this.setState({skip : nextSkip, isloadingmore:true})
   }
  
    render(){

      const {  loading } = this.props.post;
      const { posts, profilesPro} = this.state;
 
      return (
        
        <div className="Contents_App post_wrapper">
            <div className='loadmore'>
            
            </div>
        <div className="">
          { loading ?(
             <div>

                <SpinnerDots/> 

                <PostFeeds profiles={profilesPro} posts={posts}/>

             </div>) : <PostFeeds profiles={profilesPro} posts={posts} />
          }
        </div>

      </div>
      )
    }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  //getProProfile:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
  profilesPro :state.profile.profiles
})

export default connect(mapStateToProps, { getPosts, getNotifications })(Posts);