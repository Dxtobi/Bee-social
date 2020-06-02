import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postsActions';
import { Link,  } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import moment  from 'moment'
import { TiTimes } from 'react-icons/ti';

class CommentItem extends Component {

  onDeleteClick(postId, commentId){
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    //console.log(this.props)
    return (
      <div className="comment-container">
      <div className="comment-object-holder">
        <div className="comment-header">
              <Link to={`/profile/${this.props.comment.user._id}`}>
                <div className="feed-profile-img"><Avatar style={{width:20, height:20}} src={`/${comment.user.userImageData}`}  alt={comment.user.name}  /></div>
              </Link>
              <div className="comment-handle">{comment.user.handle}
                <div className="comment-text">
                  <div className="lead" style={{fontWeight:22}}>{comment.text.trim()}.</div>
                </div>
              </div>
              <div className='v-spacer'/> 
              <small className="comment-date"> { ` ${moment.parseZone(comment.date).fromNow()}`}</small>
              <div className='v-spacer'/> 
              
              { comment.user._id === auth.user.id ? (

                <TiTimes  onClick={this.onDeleteClick.bind(this, postId, comment._id)}/>

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
  postId:PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
