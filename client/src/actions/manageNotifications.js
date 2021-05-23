import { GET_NOTIFICATION, GET_ERRORS, NOTIFICATION_LOADING } from "./types";

import axios from "axios";

export const getNotifications = (oo) => async dispatch => {
  try {
    //console.log(oo)
    const res = await axios.get("/api/notification/get-notifications");

    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteNotification = (id) => async dispatch => {
  try {
   // console.log('nff')
    await axios.delete(`/api/notification/deletenotifications/${id}`);
    dispatch(getNotifications());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const seenNotification = id => async dispatch => {
  try {
    await axios.patch(`/api/notification/seen-notifications/${id}`);
    dispatch(getNotifications())
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};


export const  setNfLoading = ()=>async dispatch=> {
  dispatch(
    {
      type:NOTIFICATION_LOADING
    }
  )
}

