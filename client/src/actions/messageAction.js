import axios from "axios";

import { GET_ERRORS, TYPING_MSG, GET_MESSAGES, DELETE_MESSAGE, MSG_LOADING, GET_USERS_TO_MESSAGES,MSG_SENT, CLEAR_MESSAGE, MSG_NOT_LOADING } from "./types";

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

export const seenMessage = (id) => async dispatch => {
  try {
   // dispatch(setMsgLoading());
    await axios.post("/api/conversation/message_seen", {user_id:id});
     return
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const startConversation = (id, history) => async dispatch => {
  try {
   // dispatch(setMsgLoading());
   dispatch(setMsgLoading())
    await axios.post("/api/conversation/start_conversation", { id: id }).then((response) => {
      dispatch(setMsgStopLoading());
      console.log(response.data)
      history.push(`/message`)
    });
     return
  } catch (err) {
    dispatch(setMsgStopLoading());
    return dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const getConversation = (id, history) => async dispatch => {
  try {
    dispatch(setMsgLoading());
    await axios.get("/api/conversation/get_conversation/"+id,).then((response) => {
      dispatch(setMsgStopLoading());

      if (response.data.available) {
        history.push(`/messaging/${response.data.data._id}`, {id:id})
      }
      console.log(response.data)
      return response.data
    });
    
  } catch (err) {
    //console.log(err)
    dispatch(setMsgStopLoading());
    return dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const blockConversation = (id) => async dispatch => {
  try {
   // dispatch(setMsgLoading());
   dispatch(setMsgLoading())
    await axios.get("/api/conversation/block_conversation", { id: id }).then((response) => {
      dispatch(setMsgStopLoading());
      return response.data
    });
     return
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
    if (id === undefined) {
      console.log(undefined)
        return
      }
      dispatch(setMsgLoading());
   // console.log('hit')
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
   // dispatch(getMessages(id))
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

//set message loading
export const setMsgStopLoading = () => {
  return {
    type: MSG_NOT_LOADING
  }
}

export const setTypingTrue = () => {
  return {
    type: TYPING_MSG
  }
}