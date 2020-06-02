import axios from 'axios';
import {
    getProfiles
  } from './profileActions';

import {
    getTags, addTag , getPosts, aprovedPost
  } from './postsActions'; 

  import {
    GET_TV_REQUEST,
    SET_LOADING,
    GET_PROMO_USERS,
    GET_ERRORS,
    DELETE_TAG
  } from './types';

  export const getAllPost = () => dispatch => {
    dispatch( getPosts())
  }
  export const approveAdsPost = () => dispatch => {
    dispatch(aprovedPost())
  }
  export const getAllProfiles = () => dispatch => {
    dispatch( getProfiles())
  }
  export const getAllTags = () => dispatch => {
    dispatch( getTags())
  }

  export const addTags = (tag) => dispatch => {
    dispatch( addTag(tag))
  }
//get users for pipetv
export const getTv = () => dispatch => {
    dispatch(setAdminReqLoadin());
    axios
        .get('/api/admin/tv/request')
        .then(res =>
            dispatch({
                type: GET_TV_REQUEST,
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
  
  export const deleteTags = (id) => dispatch => {
   // dispatch(setAdminReqLoadin());
    axios
        .delete(`/api/posts/tags/${id}`)
        .then(res =>
          dispatch({
                type: DELETE_TAG,
                payload: id
          })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
  };
  //
  export const comfarmTvRequest = (id) => dispatch => {
    axios
        .post(`/api/admin/tv/request/${id}`)
        .then(res =>
            dispatch(getTv())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
  };

  export const getPromoRequest = () => dispatch => {
    dispatch(setAdminReqLoadin());
    axios
        .get('/api/admin/promo/request')
        .then(res =>
            dispatch({
                type: GET_PROMO_USERS,
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
  export const comfarmPromoRequest = (id) => dispatch => {
    axios
        .post(`/api/admin/promo/request/${id}`)
        .then(res =>
            dispatch(getPromoRequest())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
  };
  export  const setAdminReqLoadin=()=> dispatch =>{
    dispatch({
        type: SET_LOADING,
    })
  }