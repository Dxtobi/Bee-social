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
      this.props.getNotifications('notification');
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
  markSeen = (id) => {
    this.props.seenNotification(id)
    }
    renderNotification(notification) {
      const classes = classnames({
        "list-group-item notification-item": true,
        "list-group-item-success": !notification.seen
    });
    return (

      <li   className={classes} key={notification._id}>
        {this.state.showMsgOption ? <div className='message-menu' onClick={e=>this.deleteNOtification(notification._id)}>Delete <MdDelete /></div>:null}
        <div >
        <div className='notfy-holder' onDoubleClick={this.onClickNf}>
          <div> <Avatar style={{width: 30,  height: 30, marginRight:10}} variant =  'circle' src={`/${notification.avatar}`} /> </div>
        <Link to={notification.link} onClick={() => this.props.seenNotification(notification._id)}>
          <div   className='ntfmsg'>{notification.message}</div>
          <div className="d-flex justify-content-between">
              <span className="text-primary d-block">
                {moment.parseZone(notification.createdAt).fromNow()}
              </span>
            </div>
        </Link>
        {notification.seen ? (
                <div className='mark_seen' style={{color:'gray'}}><div>seen</div></div>
              ):
              (<div onClick={()=>this.markSeen(notification._id)} className='mark_seen'>
               <div> mark as seen</div>
              </div>)
              }
        </div>
        </div>
      </li>
    );
  }

  render() {
    const { notifications } = this.props;
   // console.log(notifications)
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
