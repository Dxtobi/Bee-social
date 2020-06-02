import axios from 'axios';

import {
  GET_GROUPS,
  GET_GROUP,
  GET_ERRORS,
  JOIN_GROUP,
  DELETE_GROUP,
  LEAVE_GROUP,
  SET_LOADING,
  GET_GROUP_MESSAGE
} from './types';


export const joinGroup = (id) => dispatch => {
  axios
    .patch(`/api/group/joingroup/${id}`, )
    .then(res =>
      dispatch({
        type: JOIN_GROUP,
        payload: res.data
      })
    )
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    })
}

export const leaveGroup = (id) => dispatch => {
  axios
    .delete(`/api/group/leave/${id}`)
    .then(res =>
      dispatch({
        type: LEAVE_GROUP,
        payload: res.data
      })
    )
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    })
}


// Create groups
export const createGroup = (groupData, history) => dispatch => {
  axios
    .post('/api/group/create', groupData)
    .then(res =>{ dispatch(getUserGroup())
      history.push(`/message`)})
    .catch(err =>
      
    console.log(err)
      
    );
};

export const updateGroup = (id, groupData, history) => dispatch => {
    axios
      .patch(`/api/group/edit/${id}`, groupData)
      .then(res => history.push(`/groupchat/${id}`))
      .catch(err =>
        console.log(err)
      );
  };

export const getUserGroup = () => dispatch => {
  console.log('get action')
      axios
        .get('/api/group/groups/mygroups')
        .then(res =>
          dispatch({
            type: GET_GROUPS,
            payload: res.data
          })
        )
        .catch(err =>{
          console.log(err)
          dispatch({
            type: GET_ERRORS,
            payload: err.response
          })}
        );
    }
export const deleteGroup = (id) => dispatch => {
  if(window.confirm('Are you sure? This CAN´T be undone!')){
    axios
      .delete(`/api/group/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_GROUP,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
}

export const sendGroupMessage = (id, msg) => dispatch => {
  axios
    .post(`/api/group/send/group/message/${id}`, {msg})
    .then(res =>
      dispatch(getGroupMessages(id))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

}
export const getGroupMessages = (id) => dispatch => {
  dispatch(setLoading())
  axios
    .get(`/api/group/get/group/message/${id}`)
    .then(res =>
      dispatch({
        type: GET_GROUP_MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

}
export const getGroup = (id) => dispatch => {
  dispatch(setLoading())
    axios
      .get(`/api/group/${id}`)
      .then(res =>
        dispatch({
          type: GET_GROUP,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  
}
export const getGroupAll = () => dispatch => {
  dispatch(setLoading())
  axios
    .get(`/api/group/`)
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

}


export const setLoading = () => dispatch => {
  
      dispatch({
        type: SET_LOADING,
        payload: ''
      })
    

}
