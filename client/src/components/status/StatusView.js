import React, {Component} from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import StatusImg from './statusImg';
import {getUserStatus } from '../../actions/status';
import { Avatar } from '@material-ui/core';
//import PostItem from  '../posts/PostItem';
import { IoIosArrowBack } from 'react-icons/io';
//import {IoIosArrowBack} from 'react-icons/io'
class StatusView extends Component {


  state={

    status:[],
    profilePix:'',
    handle:''

    }

  componentDidMount() {
    this.props.getUserStatus(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
  //  console.log(nextProps.status, nextProps.status.lenght)
    if(nextProps.status.length>0){
    // console.log(nextProps.status.length, nextProps.status[0].user.userImageData, '1111')
        this.setState({status:nextProps.status, profilePix:nextProps.status[0].user.userImageData, handle:nextProps.status[0].user.handle})
    }
  }

  handlegoback = ()=>{
    //  this.setState({isloading : true, messages :[],  profile : {} })
      this.props.history.goBack()
  }
  render() {
  // console.log(this.state.status)
    return (
      <div className="status-body">
           <button onClick={this.handlegoback} className='img-go-back'><IoIosArrowBack className='btn-icons'/></button>
        <div className="status-header">
           <Avatar style={{width:30 , height:30}} src={`/${this.state.profilePix}`} alt='' /><div style={{marginLeft:10}}>{this.state.handle}</div><div style={{marginLeft:5}}>.{this.state.status.length}</div>
        </div>
        <div className='cards-sliders'>
        {
            this.state.status.map((s, i)=>{

               return  <StatusImg key={i} img={s.media}/>

            })
        }
        </div>
      </div>
    );
  }
}

StatusView.propTypes = {
 status: PropTypes.array.isRequired,
  
  
};

const mapStateToProps = state => ({
 
 status:state.Status.status
})

export default connect(mapStateToProps, {getUserStatus})(StatusView);
