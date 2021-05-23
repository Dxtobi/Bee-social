import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { deleteComment, getComment, getComments, replyComment } from '../../actions/postsActions';
import CommentItem from '../post/CommentItem';
import Spinner from '../common/Spinner';
import CommentForm from '../post/CommentForm';
import CommentFeed from '../post/CommentFeed';
class Comment extends React.Component {
    state = { 
        
     }

    componentDidMount() {
        this.props.getComment(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
    }
    componentDidUpdate() {

    }
    getSnapshotBeforeUpdate(e) {
       // console.log(e.post)
        return e
    }
    
    onSubmitComment=(id, obj)=> {
       // console.log(id, obj)
        this.props.replyComment(id, obj)
      }
      handlegoback = ()=>{
        this.props.history.goBack()
      }
    render() {
        console.log(this.props)
        if (this.props.post.loading || this.props.post.comment.user === undefined || this.props.post.comment === null) {
          return <Spinner/>
        }
        return (
            <div>
              <CommentItem comment={this.props.post.comment}/>
                <div className='reply-component'>
                    <CommentFeed handlegoback={ this.handlegoback}postId={this.props.post.comment._id} comments={this.props.post.comments} />
                </div>
                <CommentForm onSubmitComment={this.onSubmitComment} postId={this.props.post.comment._id} postedby={this.props.post.comment.user.handle}/>
            </div>
        );
    }
}

Comment.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    replyComment:PropTypes.func.isRequired,
    getComments:PropTypes.func.isRequired,
    getComment:PropTypes.func.isRequired
  };
const mapStateToProps = (state) =>({ 
   
        post: state.post
    
})
export default connect(mapStateToProps, {getComment, getComments, replyComment, deleteComment})(Comment)