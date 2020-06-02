import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import {MdAccountCircle} from "react-icons/md";
import { IoMdLogIn , IoIosSend} from "react-icons/io"
//import {FaSignInAlt} from 'react-icons/fa'
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
//import {GiWhiteCat} from 'react-icons/gi';
import AuthHeader from './AuthHeader';
import { Avatar } from '@material-ui/core';
//import { ThemeProvider } from 'styled-components';

class Navbar extends Component {

    onLogoutClick(  ){
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
   
      
    
     

    render() {
      const { isAuthenticated , user} = this.props.auth;
      

        return (

          <nav className="header-div">
            
            <div className="header-div-name-image-">
            <Link className="header-brand" to="/dashboard"><Avatar style={{width: 22,  height: 22}} variant =  'circle' alt = '' src = {`/${user.avatar}`}/></Link>
            </div>
            <div className="v-spacer"/>
                <Link to="/new-story"><IoIosSend className='header-text-toggle header-item icons-x'/></Link>
               
                { isAuthenticated ?
                 (<AuthHeader  toggle = {this.props.sidebarToggle} auth={this.props.auth}/>)
                : (<div className="side-link">
                     <div className="header-item">
                       <Link className="header-link" to="/login"><IoMdLogIn className="icons-x" /></Link>
                     </div>
                   </div>) }
          </nav>
        )
    }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({
  auth: state.auth,
  Togle:state.Togle
});

export default connect( mapStateToProps, { logoutUser, clearCurrentProfile } )( Navbar );
