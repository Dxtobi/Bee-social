import { UPLOADSTATUS, GET_ERRORS, GETSTATUS} from "./types";
import axios from "axios";

export const addStatus = (data) => async dispatch => {
  try {
      console.log(data)
    const res = await axios.put("/api/posts/status", data);
    dispatch({
      type: UPLOADSTATUS,
      payload: res.data
    });
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const getUserStatus = (id) => async dispatch => {
  try {
     // console.log(id)
    const res = await axios.get(`/api/posts/status/${id}`);
    dispatch({
      type: GETSTATUS,
      payload: res.data
    });
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

