import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW
} from '../actions/types';

const initialState = {
  profile: {},
  profiles: [],
  loading: false
};

export default function( state = initialState, action ){
  switch( action.type ){
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading:  false
      }
    case GET_PROFILES:
      return{
        ...state,
        profiles: action.payload,
        loading: false
      }
    case PROFILE_FOLLOW:
      return{
        ...state,
        profiles: action.payload,
        loading: false
      }
    case PROFILE_UNFOLLOW:
        return{
          ...state,
          profiles: action.payload,
          loading: false
        }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    default:
      return state;
  }
}
