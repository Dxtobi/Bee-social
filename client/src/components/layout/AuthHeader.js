import React, { Component } from 'react';
import { IoMdMore } from 'react-icons/io';
//import {socket as sk} from "../../App";
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

class AuthHeader extends Component {
    
   
   /* componentDidMount() {
       let socket = sk.connect()
         const {user} = this.props.auth;
         socket.on('id', data =>{
           this.setState({socketid : data})
        //   console.log(this.state.socketid)
           socket.emit('username', user.id)
         })
        }*/
     toggleTheme =()=>{
      this.props.toggle()
     }
    render() {
    
        return (
            <div className="side-link">
                <div className="header-item header-text-toggle image-holder">
                 <IoMdMore className="icons-x" onClick={this.toggleTheme } />
                </div>
            </div>
        );
    }
}


  
 

  export default AuthHeader
// <IoMdLogOut className="icons" onClick={ this.onLogoutClick.bind( this ) } />