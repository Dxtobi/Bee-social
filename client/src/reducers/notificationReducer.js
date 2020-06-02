import { SET_NOTIFICATION, GET_NOTIFICATION, NOTIFICATION_LOADING, CLEAR_NOTIFICATION } from "../actions/types";

const initialState = {
 notifications:[]
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...action.payload
      };
    case GET_NOTIFICATION:
      return {
        ...action.payload
      };
    case CLEAR_NOTIFICATION:
      return {};
    case NOTIFICATION_LOADING:
        return {};

    default:
      return state;
  }
};
