import { GETSTATUS } from "../actions/types";

const INITIAL_STATE = {
  status:[]
};

export default function(state = INITIAL_STATE, action) {
  const { type} = action;

  switch (type) {
    case GETSTATUS:
      return {
        ...state,
        status: action.payload
        
      };
    default:
      return state;
  }
}
