import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  //DELETE_POST,
  GET_POST,
  CLEAR_ERRORS,
  POST_BOOKMARK,
  POST_LIKE,
  POST_UNBOOKMARK,
 // POST_UNLIKE,
  GET_COMMENT,
  GET_TAGS,
  TYPING_MSG,
  GET_COMMENTS
} from './types';


export const addTag = tagname => dispatch => {
  dispatch(clearErrors());
  axios
      .post('/api/posts/tags/new', {tagname})
      .then(res =>
          dispatch(getTags())
      )
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
};
export const addAds = (data, history) => dispatch => {
  dispatch(clearErrors());
  axios
      .post('/api/posts/new/ads', data)
      .then(res => history.push('/notifications'))
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
};

export const getTags = () => dispatch => {
//console.log('hited tags')
axios
  .get('/api/posts/tags/all')
  .then(res => {
      dispatch({
        type: GET_TAGS,
        payload: res.data
      })
    }
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};

export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload:res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

export const getPosts = (skip=0) => dispatch => {
console.log('hited')
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${skip}`)
    .then(res => {
      console.log(res + 93)
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })}
    );
};

export const bookmark = id => dispatch => {

  axios
    .patch(`/api/posts/bookmarks/${id}`)
    .then(res =>
      dispatch({
        type: POST_BOOKMARK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const removeBookmark = id => dispatch => {

  axios
    .get(`/api/post/bookmark/${id}`)
    .then(res =>
      dispatch({
        type: POST_UNBOOKMARK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPost = id => dispatch => {

  dispatch(setPostLoading());
  //console.log('hited single post')
  axios
    .get(`/api/posts/single/${id}`)
    .then(res => {
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    );
};

export const getUserPost = id => dispatch => {

  dispatch(setPostLoading());

  axios
    .get(`/api/posts/user/${id}`)
    .then(res => {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};


export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch(getPosts())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

export const aprovedPost = id => dispatch => {
  axios
    .patch(`/api/posts/aproved-post/${id}`)
    .then(res =>  dispatch(getReportedPost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};
export const addLike = id => dispatch => {
  axios
    .patch(`/api/posts/like/${id}`)
    .then(res =>  dispatch({
      type: POST_LIKE,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const reportPost = id => dispatch => {
  axios
    .post(`/api/posts/report-post/${id}`)
    .then(res =>  dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
///report-post/all
export const getReportedPost = ()=> dispatch => {
  axios
    .get(`/api/posts/report-post/all`)
    .then(res =>  dispatch({
          type: GET_POSTS,
          payload:res.data
        }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const addComment = (postId, commentData)  => dispatch => {
    dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch(getComments(postId))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const replyComment = (postId, commentData)  => dispatch => {
  dispatch(clearErrors());
axios
  .post(`/api/posts/reply/${postId}`, commentData)
  .then(res =>
    dispatch(getComments(postId))
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const getComments = (postId)  => dispatch => {
  dispatch(setPostLoading());
axios
  .get(`/api/posts/comments/${postId}`)
  .then(res =>{
   
    dispatch({
      type: GET_COMMENTS,
      payload:res.data
    })}
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const getComment = (commentId)  => dispatch => {
  dispatch(setPostLoading());
axios
  .get(`/api/posts/comment/${commentId}`)
  .then(res =>{
  //  console.log(res + '========================== 180')
    dispatch({
      type: GET_COMMENT,
      payload:res.data
    })}
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};
export const deleteComment = (replyid, commentId)  => dispatch => {
  axios
    .delete(`/api/posts/comment/${replyid}`)
    .then(res =>
      dispatch(getComments(commentId))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const setTypingTrue = () => {
  return {
    type: TYPING_MSG
  }
}

