import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { follow , unfollow } from '../../actions/profileActions';
import { Link } from 'react-router-dom';


class Followers extends Component {
    state = { 
        follower:true
     }
     componentDidMount() {
         this.setState({follower:this.findProfileFollow(this.props.following, this.props.id)})
     }
     tugleFollow=()=>{
        this.setState({
            follower : !this.state.follower
        })
     }

     findProfileFollow(follow, userId){
        //const { auth } = this.props;
        if(follow.length > 0){
          if(follow.filter(e => e.user._id === userId).length > 0) {
            return true;
          } else {
            return false;
          }
        }
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
                    this.state.follower?
                    (<div onClick={this.handleunfollow} className='followersbtn'>following</div>)
                    :(<div  onClick={this.handlefollow} className='follow'>follow</div>)
                }
            </div>
        );
    }
}



const mapStateToProps = state => ({
  auth: state.auth
})

export default connect( mapStateToProps, { follow , unfollow } )( Followers );
//export default Following;