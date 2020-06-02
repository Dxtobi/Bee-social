import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPost, getComment } from '../../actions/postsActions';
//import PostItem from  '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import PostItem from '../posts/PostItem';
import {IoIosArrowBack} from 'react-icons/io'
class Post extends Component {

  componentDidMount() {
    this.props.getComment(this.props.match.params.id)
    this.props.getPost(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
   // console.log(nextProps)
  }
  handlegoback = ()=>{
    //  this.setState({isloading : true, messages :[],  profile : {} })
      this.props.history.goBack()
    }
  render() {

    const { post, loading } = this.props.post;
    const { comments } = this.props.post;
    let postContent;

    if(post === null || loading || Object.keys(post).length === 0){
      postContent = <Spinner/>;
    }else{
      //console.log(this.props)
      postContent = (
        <div>
          <div style={{textAlign:'center', display: 'flex'}} >
           <IoIosArrowBack onClick = {this.handlegoback} className='icons title-div'/>Go Back
          </div>
          
          <PostItem singlePost={true} post={post}/>
          <CommentFeed postId={post._id} comments={comments} />
          <CommentForm postId={post._id} postedby={post.user.handle}/>
        </div>
      );
    }
    return (
      <div className=" post">
        <div className="Contents_App container">
          
            <div className="">
              
              { postContent }
            
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  
  
};

const mapStateToProps = state => ({
  post: state.post,
  comments: state.post.comments
})

export default connect(mapStateToProps, {getPost,getComment})(Post);
