
import {  GET_MESSAGE_IO,  } from "./types";






export const socketNewMessage = (e) => async dispatch => {
  //  console.log(e)
        return dispatch({
            type: GET_MESSAGE_IO,
            payload: e.message
          });
  
};


