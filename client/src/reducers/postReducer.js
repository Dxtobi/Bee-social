import {ADD_POST, TYPING_MSG,POST_LIKE, POST_UNLIKE, GET_TAGS, GET_POSTS, DELETE_POST,DELETE_TAG, POST_LOADING, GET_POST, POST_BOOKMARK, POST_UNBOOKMARK, GET_COMMENT} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    comments:[],
    tags:[],
    loading: false,
    sent:false
};

export default function(state = initialState, action) {
    switch (action.type){
      case POST_LOADING:
        return {
          ...state,
          loading: true
        }
      case TYPING_MSG:
          return {
            ...state,
            sent:false
          }
      case POST_LIKE:
          return {
            ...state,
            posts: [ ...state.posts],
            loading: false
          }
      case POST_UNLIKE:
            return {
              ...state,
              loading: false
            }
      case GET_COMMENT:
              return {
                ...state,
                comments: action.payload,
                loading: false
              }
      case POST_BOOKMARK:
              return {
                ...state,
                loading: false
              }
      case POST_UNBOOKMARK:
            return {
              ...state,
              loading: false
            }
      case GET_POSTS:
          return {
            ...state,
            posts: action.payload,
            loading: false
          }
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          sent:true
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
      case DELETE_TAG:
        return {
          ...state,
          tags:state.tags.filter(tag=> tag._id !== action.payload)
        }
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          loading: false
        }
      case GET_TAGS:
        return {
            ...state,
            tags: action.payload,
         }
        default:
            return state;
    }
}