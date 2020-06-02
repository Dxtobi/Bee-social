import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Spinner from "../common/Spinner";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deleteNotification } from "../../actions/manageNotifications";
import moment from "moment";

import {
  getNotifications,
  seenNotification
} from "../../actions/manageNotifications";

import "./Notification.css";
import { Avatar } from "@material-ui/core";

class Notifications extends Component {
    componentDidMount() {
      this.props.getNotifications();
    }

      state = { 
        showMsgOption :false
    }
    deleteNOtification = (e)=>{
      this.props.deleteNotification(e)
    }
    onClickNf=()=>{
      this.setState({showMsgOption:!this.state.showMsgOption})
    }
    renderNotification(notification) {
      const classes = classnames({
        "list-group-item notification-item": true,
        "list-group-item-success": !notification.seen
    });
    return (

      <li  onClick={() => this.props.seenNotification(notification._id)} className={classes} key={notification._id}>
        {this.state.showMsgOption ? <div className='message-menu' onClick={e=>this.deleteNOtification(notification._id)}>Delete <MdDelete /></div>:null}
        <Link to={notification.link}>
        <div className='notfy-holder'onClick={this.onClickNf}>
          <div> <Avatar style={{width: 30,  height: 30, marginRight:10}} variant =  'circle' src={`/${notification.avatar}`} /> </div>
        <div>
          <div   className='ntfmsg'>{notification.message}</div>
          <div className="d-flex justify-content-between">
              <span className="text-primary d-block">
                {moment.parseZone(notification.createdAt).fromNow()}
              </span>
              {notification.seen ? (
                <span style={{color:'gray'}}> Seen</span>
              ) : 
                null
              }
              
            </div>
        </div>
        
        </div>
        </Link>
      </li>
    );
  }

  render() {
    const { notifications } = this.props;
    console.log(notifications)
    if (isEmpty(notifications)) {
      return <Spinner message="Spinner notifications" />;
    }

    return (
      <div className="container">
        <div>
          <div/>
          <div>
          <div className="notificaion-cont">Notifications {notifications.notifications.length}</div>
            <ul className="list-group">
              {notifications.notifications.reverse().map(notification => {
                return this.renderNotification(notification);
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.NOTIFICATION
  };
};

export default connect(
  mapStateToProps,
  { getNotifications, deleteNotification, seenNotification }
)(Notifications);
