import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike,  bookmark, reportPost } from "../../actions/postsActions";
import Postimg from './Postimg';
import {  MdModeComment ,MdReport} from "react-icons/md";
//import {GiRapidshareArrow,} from 'react-icons/gi'
import {IoMdHeartEmpty , IoMdHeart, IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
import {    TiDelete } from "react-icons/ti";
import {  FiRepeat } from 'react-icons/fi';
import { Avatar } from '@material-ui/core';
//import {findlink} from '../common/posttext'
//import Autolinker from "autolinker";
import moment from 'moment'
import Comment from './comment';

class PostItem extends Component {
  state = {
   marked:false,
    postlike : 0,
    postUserPro : '',
    liked :false,
    showmenu :false,
    countmarked:0,
  }

componentDidMount() {
  const { post } = this.props;
  let isliked =this.findUserLike(post.likes)
  let mark = this.findUserLike(post.bookmarked)
  this.setState({
    postlike : post.likes.length,
    countmarked : post.bookmarked.length,
    postUserHandle : post.user.handle,
    marked : mark,
    postUserPro : post.user.userProgress,
    profileimg : post.user.userImageData,
    postUserID : post.user._id,
    liked : isliked
  })
  // console.log(this.props.post.user.userProgress)
}
  onDeleteClick=(id)=>{
    this.props.deletePost(id);
  }
  
  onLikeClick=()=>{
    let id = this.props.post._id
     if(!this.state.liked){
        this.setState({
          postlike : this.state.postlike+1,
          liked :true
        })
        this.props.addLike(id);
        // window.scrollTo(0, localStorage.getItem('scrollpossition'))
        return
     }else{
      this.setState({
        postlike : this.state.postlike-1,
        liked :false
      })
      this.props.addLike(id);
     }
   return
  }
  onMarkedClick=()=>{
    let id = this.props.post._id
     if(!this.state.marked){
        this.setState({
          countmarked : this.state.countmarked+1,
          marked :true
        })
        this.props.bookmark(id);
        //add
        return
     }else{
      this.setState({
        countmarked : this.state.countmarked-1,
        marked :false
      })
      //remove 
      this.props.bookmark(id);
     }
   return
  }
 
  findUserLike=(likes)=> {
    const { auth } = this.props;
    if(likes.length > 0){
      if(likes.filter(like => like.user === auth.user.id).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  toglemenu =()=>{
    this.setState({
      showmenu :!this.state.showmenu
    })
  }
  onReportPost =(id)=>{
    this.props.reportPost(id)
    this.toglemenu()
  }
  
  render() {

    const { post, auth, showActions } = this.props;
   // console.log(this.props)
    return (
       <div>
        <div className="feed_card">
          {this.state.showmenu?
            <div className="post-model">
              <div className="post-model-item" onClick={e=>this.onReportPost(post._id)}>
                      <div>Report this post</div><MdReport className='icons'/>
              </div>
              
                    
                     { post.user._id === auth.user.id || auth.user.admin? 
                     <div className="post-model-item" onClick={e=>this.onDeleteClick(post._id)}>
                               <div>Delete this post</div> <TiDelete
                                  onClick={e=>this.onDeleteClick(post._id)}
                                  className="icons red"
                                />
                      </div>
                                :null
                     }
            </div>:null
          }
          <div className="feed_header">
          <div className={post.user.userProgress === 3  ? `feed-profile-img` : ''}><Link to={`/profile/${post.user._id}`}><Avatar style={{width: 30,  height: 30}} variant =  'circle' src={`/${post.user.userImageData}`} alt={''}  /></Link></div>
            <div className="feed-handle-text">
              {this.state.postUserHandle}
              <small style={{ fontSize:14, fontWeight:10}}>{` ${moment.parseZone(post.date).fromNow()}`}</small>
            </div>

            <div className='v-spacer'/>

            {this.state.showmenu? <IoIosArrowUp  onClick={this.toglemenu} className='icons'/>:<IoIosArrowDown  onClick={this.toglemenu} className='icons' />}
          </div>
          <div className="feed-body-container">
          <div>
             
              <div className= ''>
                <small>
                  {
                      post.tags.map(t=>{
                        return (
                          <b style={{color:'#ff8d00', fontSize:12}} key={t}>{`${t}`}</b>
                        )
                      })
                  }
                </small>
              </div>
              {post.text ?(<div className={post.text.length < 150 && post.postImageData.length<1  ? `feed_text_small` : 'feed_text'} >{post.text}</div>):null}
              {post.postImageData.length > 0 && (<Postimg imageSrc = {post.postImageData} imgAlt = {''}/>)}
              <div className='mini_feed_footer'>
                <div style={{display:'flex',}}>{this.state.postlike}likes. <div className='spacer'/> {post.comments}comments. <div className='spacer'/>{this.state.countmarked}share </div>
              </div>
            { showActions ? (
                  <div className='feed_footer'>

                    <div  className="btn btn-light mr-1">
                          <div className='feed-icon-mini-container'>
                            {!this.state.liked ?
                              (<IoMdHeartEmpty onClick={this.onLikeClick} className='icons'/>)
                              :
                              (<IoMdHeart onClick={this.onLikeClick} style={{color:'red'}} className='icons like-color'/>)
                            }
                          </div>
                    </div>

                    <div className='spacer'/>

                    <Link to={`/post/${post._id}`} className='special_a_tags'>
                    <MdModeComment className='icons'/>
                    </Link>

                    <div className='spacer'/>
                     
                         <FiRepeat
                          onClick={this.onMarkedClick}
                          className={`icons ${this.state.marked? 'like-color' : null}`}
                        />


            </div>) : null}
            
          </div>
          </div>
        </div>
        <div >
          {
            post.lastcomments && <Comment comment={post.lastcomments}/>
          }
          
         </div>
        </div>
    );
  }
}
PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike:PropTypes.func.isRequired,
  reportPost:PropTypes.func.isRequired,
  bookmark:PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {deletePost, addLike,bookmark, reportPost})(PostItem);
