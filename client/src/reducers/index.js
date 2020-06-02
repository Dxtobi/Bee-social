import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import searchReducer from "./searchReducer";
import messageReducer from "./messageReducer";
import groupReducers from "./groupReducers";
import notificationReducer from "./notificationReducer";
import toastNotificationReducer from "./toastNotificationReducer";
import adminReducer from "./adminReducr";
import togleReducer from './togleReducer';
import statusReducer from './statusReduser';

export default combineReducers( {
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  SEARCH: searchReducer,
  users : messageReducer,
  groups:groupReducers,
  NOTIFICATION: notificationReducer,
  TOAST: toastNotificationReducer,
  admin:adminReducer,
  Togle:togleReducer,
  Status:statusReducer
} );
