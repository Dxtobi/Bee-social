import {GET_GROUPS,GET_GROUP_MESSAGE, SET_LOADING, GET_GROUP, DELETE_GROUP, JOIN_GROUP, LEAVE_GROUP } from "../actions/types";

const initialState = {
  groups: [],
  group :{},
  messages:[],
  loading:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups :action.payload,
        loading:false
      };
    case GET_GROUP:
      return {
        ...state,
        group :action.payload,
        loading:false
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups :action.payload,
        loading:false
      };
    case JOIN_GROUP:
        return {
          ...state,
          group :action.payload,
          loading:false
        };
    case LEAVE_GROUP:
            return {
              ...state,
              groups :action.payload,
              loading:false
            };
    
    case GET_GROUP_MESSAGE:
              return {
                ...state,
                messages:action.payload,
                loading:false
              };
    case SET_LOADING :
              return{
                ...state,
                loading:true
              }
    default:
      return state;
  }
};
