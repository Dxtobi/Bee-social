import { GET_MESSAGES , DELETE_MESSAGE, MSG_SENT, GET_USERS_TO_MESSAGES,CLEAR_MESSAGE, TYPING_MSG, MSG_LOADING, MSG_NOT_LOADING, GET_MESSAGE_IO} from "../actions/types";

const initialState = {
  users: [],
  messages:[],
  message :{},
  loading:false,
  sent:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages :action.payload,
        loading:false
      };
    case GET_MESSAGE_IO:
        return {
          ...state,
          messages :[...state.messages, action.payload],
          loading:false
        };
    //GET_MESSAGE_IO
    case MSG_SENT:
      return {
        ...state,
        sent: true,
        loading:false
      };
    case TYPING_MSG:
      return {
        ...state,
        sent: false,
        loading:false
        };
    case DELETE_MESSAGE:
        return {
          ...state,
          messages: state.messages.filter(msg => msg._id !== action.payload),
          loading:false
        };
    case GET_USERS_TO_MESSAGES:
      return {
        ...state,
        users :action.payload,
        loading:false
      };
    case MSG_LOADING:
        return {
          ...state,
          loading: true
      };
    case MSG_NOT_LOADING:
        return {
          ...state,
          loading: false
        };
    case CLEAR_MESSAGE:
        return{
          messages:[],
          message: {},
          loading:false
        }
    default:
      return state;
  }
};
