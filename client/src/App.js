import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
//import { getNotifications } from './actions/manageNotifications';
import { Provider } from 'react-redux';

import store from './store';
//import io from 'socket.io-client'
import Navbar from './components/layout/Navbar';
import Status from './components/status/status';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Notifications from './components/notifications/Notification';
import AdminHome from './AdminComponents/adminHome';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import AuthRoute from './components/common/adminroute';
import Messages from './components/Messages/messages';
import PostForm from './components/posts/PostForm';
import Adsform from './components/forms/Adsform'
import Conversation from './components/Messages/conversation';
import CheckForCon from './components/Messages/checkForConversation';
import Settings from './components/settings/Settings';
import Security from './components/settings/changePassword';
import EditProfile from './components/edit-profile/EditProfile';
//import AddEducation from './components/add-credentials/AddEducation';
//import AddExperience from './components/add-credentials/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile_single from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import MainSearch from './components/search/mainSearch';
import NotFound from './components/not-found/NotFound';
import './App.css';
import Creategroup from './components/createGroup/creategroup';
import UpdateGroup from './components/createGroup/updategroup';
import Groups from './components/createGroup/allGroups';
import GroupChat from './components/createGroup/groupChat';
import Sidebar from './components/sidebar/sidebar'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, blackTheme } from './theme';
//import PropTypes from 'prop-types';
import { GlobalStyles } from './global';
import FullImage from './components/photo/FullImg';
import PeopleYouKnow from './components/followingAndFollowers/PeopleYouKnow';
import StatusView from './components/status/StatusView';
import Comment from './components/Comments/Comment';
//import ToggleTheme from './utils/ToggleTheme'


//Check for token 
if( localStorage.jwtToken ){
  //Set auth token header auth
  setAuthToken( localStorage.jwtToken );
  //Decode token and get user info and export
  const decoded = jwt_decode( localStorage.jwtToken );
  //Set user and isAuthenticated
  store.dispatch( setCurrentUser( decoded ) );

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if( decoded.exp < currentTime ){
    // Logout user
    store.dispatch( logoutUser() );

    // Clear current profile
    store.dispatch( clearCurrentProfile() );

    // Redirect to login page
    window.location.href = '/login';
  }else{
    //call soket.io
   
  }
}
//let socket = null//io

class App extends Component {

  state={
    theme : lightTheme,
    themetogle:1,
    showSdebar:false
  }

  componentDidMount() {
    let oldtheme = window.localStorage.getItem('theme')
    if (oldtheme === '2') {
      this.setState({theme:darkTheme, themetogle:2})

    } else if (oldtheme === '3'){
      this.setState({theme:blackTheme, themetogle:3})
      
    } else{
      this.setState({theme:lightTheme, themetogle:1})
    }
 //   console.log('props=====' ,this.props)
  

  
  }

  
  
  // The function that toggles between themes
 toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (this.state.themetogle === 1) {
      this.setState({theme:darkTheme, themetogle:2})
      window.localStorage.setItem('theme',2)
    // otherwise, it should be light
    } else if (this.state.themetogle === 2){
      this.setState({theme:blackTheme, themetogle:3})
      window.localStorage.setItem('theme',3)
    } else{
      this.setState({theme:lightTheme, themetogle:1})
      window.localStorage.setItem('theme',1)
    }
  }
 componentWillReceiveProps(nextProps) {
  // console.log('props=====' , nextProps)
 }


  componentWillUnmount() {
   // socket.disconnect()
  }
  sidebartugle = ()=>{
    this.setState({
      showSdebar: !this.state.showSdebar,
   })
  }
  render() {
    const {theme, showSdebar}=this.state
   // console.log(this.props.Togle)
    return (
    <Provider store={ store }>
      <ThemeProvider theme={theme}>
     
      <Router>
      
      <div>
        <Sidebar sidebarToggle={this.sidebartugle} toggle={this.toggleTheme} show={showSdebar}/>
        <div className="App">
        <Navbar sidebarToggle={this.sidebartugle} />
        <GlobalStyles />
           <div className='h-spacer'/>
           <Switch>
               <Route exact path="/" component={ Landing } />
               <Route exact path="/register" component={ Register } />
               <Route exact path="/login" component={ Login } />
               <PrivateRoute exact path="/fullimage/uploads/:img" component={ FullImage } />
               <PrivateRoute exact path="/feed" component={ Posts } />
               <PrivateRoute exact path="/dashboard" component={ Dashboard } />
               <PrivateRoute exact path="/" component={ Posts } />
               <PrivateRoute exact path="/profiles" component={ Profiles }/>
               <PrivateRoute exact path="/group/create" component={ Creategroup }/>
               <PrivateRoute exact path="/edit/group/:id" component={ UpdateGroup }/>
               <PrivateRoute exact path="/groups" component={ Groups }/>
               <PrivateRoute exact path="/profile/:id" component={ Profile_single }/>
               <PrivateRoute exact path="/new-story" component={PostForm}/>
               <PrivateRoute exact path="/notifications" component={ Notifications } />
               <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
               <PrivateRoute exact path="/search" component={ MainSearch } />
               <PrivateRoute exact path="/message" component={ Messages } />
               <PrivateRoute exact path="/groupchat/:id" component={ GroupChat } />
               <PrivateRoute exact path="/conversations/:id" component={CheckForCon} />
               <PrivateRoute exact path="/messaging/:id" component={Conversation}/>
               <PrivateRoute exact path="/post/:id" component={ Post } />
               <PrivateRoute exact path="/new ads" component={ Adsform } />
               <PrivateRoute exact path="/status" component={ Status } />
               <PrivateRoute exact path="/followers" component={ PeopleYouKnow } />
               <PrivateRoute exact path="/settings" component={ Settings } />
               <PrivateRoute exact path="/status/:id" component={StatusView} />
               <PrivateRoute exact path="/comment/:id" component={ Comment } />
               <PrivateRoute exact path="/security" component={ Security } />

               <AuthRoute exact path="/advert/request/:id" component={ Post }/>
               <AuthRoute exact path="/advert/request/all" component={ Post }/>
               <AuthRoute exact path="/users/list/all" component={ Post }/>
               <AuthRoute exact path="/users/user/:id" component={ Post }/>
               <AuthRoute exact path="/posts/list/all" component={ Post }/>
               <AuthRoute exact path="/primume/user/:id" component={ Post }/>
               <AuthRoute exact path="/user/tvs/all" component={ Post }/>
               <AuthRoute exact path="/user/admin/panel-v1" component={ AdminHome }/>
               <AuthRoute exact path="/primume/user/all" component={ Post }/>
                  <AuthRoute exact path="/tags/edit" component={Post} />
                  <Route exact path="/notfound" component={ NotFound }/>
               <Route  component={ NotFound }/>
           </Switch>
            <div className='h-spacer'/>
            <div className='h-spacer'/>
        </div>
       
        <Footer/>
        </div>
      </Router>
      
      </ThemeProvider>
    </Provider>
    );
  }
}


export default App
