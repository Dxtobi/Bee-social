import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES,
  PROFILE_UNFOLLOW,
  PROFILE_FOLLOW
} from './types';
 

export const follow = (id) => dispatch => {
  axios
    .patch(`/api/profile/follow/${id}`, )
    .then(res =>
      dispatch({
        type: PROFILE_FOLLOW,
        payload: res.data
      })
    )
    .catch(err =>{
      dispatch({
        type: PROFILE_FOLLOW,
        payload: null
      })
    })
}

export const unfollow = (id) => dispatch => {
  axios
    .delete(`/api/profile/unfollow/${id}`)
    .then(res =>
      dispatch({
        type: PROFILE_UNFOLLOW,
        payload: res.data
      })
    )
    .catch(err =>{
      dispatch({
        type: PROFILE_UNFOLLOW,
        payload: null
      })
    })
}

export const getCurrentProfile = () => dispatch => {

  dispatch( setProfileLoading() );
  //console.log('hited actions')
  axios
    .get( '/api/profile' )
    .then( res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch( err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
      );
};

export const getProProfile = () => dispatch => {

  //dispatch( setProfileLoading() );
  //console.log('hited actions')
  axios
    .get( '/api/posts/status/get' )
    .then( res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch( err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
      );
};

export const getPeopleYouKnow = () => dispatch => {
 // dispatch( setProfileLoading() );
//console.log('hited actions')
  axios
    .get(`/api/profile/peopleyouknow` )
    .then( res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch( err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
      );
};

/////
export const getProfileByHandle = (id) => dispatch => {
  dispatch( setProfileLoading() );
console.log('hited actions')
  axios
    .get(`/api/profile/handle/${id}` )
    .then( res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch( err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
      );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .put('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      
    console.log(err)
      
    );
};

export const createAdminProfile = (profileData) => dispatch => {
  axios
    .post('/api/profile/admin/new', profileData)
    .then(res => dispatch(getAdminProfile()))
    .catch(err =>
      
      console.log(err)
      
    );
};

export const editAdminProfile = (id) => dispatch => {
  axios
    .put(`/api/profile/adminedit/${id}`)
    .then(res => dispatch(getAdminProfile()))
    .catch(err =>
      
    console.log(err)
      
    );
};

export const editProProfile = (id) => dispatch => {
  axios
    .put(`/api/profile/editProProfile/${id}`)
    .then(res => dispatch(getAdminProfile()))
    .catch(err =>
      
    console.log(err)
      
    );
};

export const requestProProfile = (history) => dispatch => {
  axios
    .put(`/api/profile/requestProProfile`)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      
    console.log(err)
      
    );
};

export const getAdminProfile = () => dispatch => {
  axios
    .get('/api/profile/admins/all')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err =>
      
    console.log(err)
      
    );
};

export const getProfiles = () => dispatch => {

  dispatch(setProfileLoading());

  axios
    .get('/api/profile/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
}

export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This CAN´T be undone!')){
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
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

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
