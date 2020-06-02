import { GET_MESSAGES , DELETE_MESSAGE, MSG_SENT, GET_USERS_TO_MESSAGES,CLEAR_MESSAGE, TYPING_MSG, MSG_LOADING} from "../actions/types";

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
    case MSG_SENT:
      return {
        sent:true
      };
    case TYPING_MSG:
        return {
          sent:false
        };
    case DELETE_MESSAGE:
        return {
          ...state,
          messages: state.messages.filter(msg => msg._id !== action.payload)
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
    case CLEAR_MESSAGE:
        return{
          messages:[],
          message:{}
        }
    default:
      return state;
  }
};
