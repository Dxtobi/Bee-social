import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { IoMdLogIn , IoIosSend} from "react-icons/io"
import {GoPrimitiveDot} from 'react-icons/go'
import { connect } from 'react-redux';
import { getNotifications } from '../../actions/manageNotifications';



class NF extends Component {

    state ={
        nfs:[],
        new:false
    }

    componentDidMount() {
        this.props.getNotifications();
    }

    componentWillReceiveProps(np){
     //   console.log(np.notifications.notifications)
       this.setState({nfs : np.notifications.notifications, new: this.checkfornew(np.notifications.notifications)})
        
    }



    checkfornew = (e)=>{
      return  e.some((nf)=>{
            if(nf.seen === false){
                return true
            }
            return false
        })
    }
    render() {

        return (
        this.state.new ?(<div>
                <GoPrimitiveDot className='tini-icon-nfy'/>
            </div>):null
        )
    }
}

NF.propTypes = {
  getNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = ( state ) => ({
    notifications: state.NOTIFICATION
});

export default connect( mapStateToProps, { getNotifications } )( NF );
