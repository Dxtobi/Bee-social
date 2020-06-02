import axios from "axios";

import { GET_ERRORS, TYPING_MSG, GET_MESSAGES, DELETE_MESSAGE, MSG_LOADING, GET_USERS_TO_MESSAGES,MSG_SENT, CLEAR_MESSAGE } from "./types";

export const getUsersToSendMessageTo = () => async dispatch => {
  try {
    dispatch(setMsgLoading());
    const records = await axios.get("/api/conversation/message");

    return dispatch({
      type:  GET_USERS_TO_MESSAGES,
      payload: records.data
    });
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const clearMsg = () => async dispatch => {
  try {
   // console.log('hited clearmsg')
    return dispatch({
      type: CLEAR_MESSAGE,
      payload: []
    });
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const  getMessages= (id) => async dispatch => {
    try {
      dispatch(setMsgLoading());
    //  console.log('hited getmsg')
      const records = await axios.get(`/api/conversation/conversations/${id}`);
      return dispatch({
        type: GET_MESSAGES,
        payload: records.data
      });
    } catch (err) {
      return dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  };

export const sendMessage = (data, id) => async dispatch => {
  try {
  // console.log(data)
   await axios.post("/api/conversation/send-message", data).then(()=>{
    dispatch(getMessages(id))
    return dispatch({
      type: MSG_SENT,
    });
    
    });
   
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.message
    });
  }
};

export const deleteMessage = (id) => async dispatch => {
  try {
   await axios.delete(`/api/conversation/delete-message/${id}`).then(()=>{
        return dispatch({
          type: DELETE_MESSAGE,
          payload:id
        });
    });
   
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.message
    });
  }
};
//set message loading
export const setMsgLoading = () => {
  return {
    type: MSG_LOADING
  }
}

export const setTypingTrue = () => {
  return {
    type: TYPING_MSG
  }
}