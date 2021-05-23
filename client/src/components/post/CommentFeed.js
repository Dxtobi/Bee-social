import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {

  render() {

    const { comments, postId, handlegoback} = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} handlegoback={handlegoback}/>
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
