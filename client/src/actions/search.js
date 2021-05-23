import { GET_SEARCH, GET_ERRORS } from "./types";
import axios from "axios";

export const getSearch = () => async dispatch => {
  try {
    const res = await axios.get("/api/search");
    dispatch({
      type: GET_SEARCH,
      payload: res.data
    });
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const makeASearch = (searchVar) => async dispatch => {
  try {
    const res = await axios.get(`/api/search/searching/${searchVar}`);
    dispatch({
      type: GET_SEARCH,
      payload: res.data
    });
  } catch (err) {
    return dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};