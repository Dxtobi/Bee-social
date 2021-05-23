import {CLEAR_ERRORS, GET_ERRORS} from '../actions/types';

const initialState = {
  error:'',
  isError:false
};

export default function( state = initialState, action ){
  switch( action.type ){
    case GET_ERRORS:
      console.log(action.payload)
      return {
        ...state,
        isError: true,
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
