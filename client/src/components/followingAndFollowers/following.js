import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { follow , unfollow } from '../../actions/profileActions';
import { Link } from 'react-router-dom';


class Following extends Component {
    state = { 
        following:true
     }
     tugleFollow=()=>{
        this.setState({
            following : !this.state.following
        })
     }

    handleunfollow=()=>{
        this.tugleFollow()
        this.props.unfollow(this.props.id)
    }

    handlefollow=()=>{
        this.tugleFollow()
         this.props.follow(this.props.id)
    }
    render() {
        return (
            <div className='followers'>
                <Link to={`/profile/${this.props.id}`}> <Avatar src={this.props.img} /></Link>
                <div style={{marginLeft: 13}}>{this.props.handle}</div>
                <div className='spacer' />
                {
                    this.state.following?
                    (<div  onClick={this.handleunfollow} className='followersbtn'>unfollow</div>):
                    (<div onClick={this.handlefollow} className='follow'>follow</div>)
                }
                
            </div>
        );
    }
}



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect( mapStateToProps, { follow , unfollow } )( Following );
//export default Following;