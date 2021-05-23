import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postsActions';
import { Link,  } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import moment  from 'moment'
import { TiTimes } from 'react-icons/ti';

class CommentItem extends Component {

  onDeleteClick = (commentId, post) => {
    const {  handlegoback} = this.props;
    this.props.deleteComment(commentId, post);
    handlegoback();
  }

  render() {
    const { comment,  auth } = this.props;
  //  console.log(this.props)
    return (
      <div className="comment-container">
      <div className="comment-object-holder">
        <div className="comment-header">
              <Link to={`/profile/${this.props.comment.user._id}`}>
                <div className="feed-profile-img"><Avatar style={{width:30, height:30}} src={`/${comment.user.userImageData}`}  alt={comment.user.handle}  /></div>
              </Link>
              <div className="comment-handle">{comment.user.handle}
                <div className="comment-text">
                  <Link to={`/comment/${this.props.comment._id}`}><div className="" >{comment.text}.</div></Link><br/>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><small >Reply</small><small className="comment-date"> { ` ${moment.parseZone(comment.date).fromNow()}`}</small></div>
                </div>
              </div>
              <div className='v-spacer'/> 
              
              { comment.user._id === auth.user.id ? (

                <div style={{fontSize:14}}><TiTimes size={20} onClick={()=>this.onDeleteClick(comment._id, comment.post)}/></div>

                ) :
                
                null

              }
          </div>
        
        
        
      </div>
    </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
//  postId:PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
