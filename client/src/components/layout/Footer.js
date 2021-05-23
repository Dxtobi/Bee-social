import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBell, FiMail, FiSettings } from 'react-icons/fi';
import {socket} from '../../utils/socketGlobal';
import { GoHome, GoPrimitiveDot } from 'react-icons/go'

//import NF from './notifiyer'
import { connect } from 'react-redux';
import { getNotifications } from '../../actions/manageNotifications';
import { getUsersToSendMessageTo } from '../../actions/messageAction';


// Copyright &copy; { new Date().getFullYear() } Developers Connector
class Footer extends React.Component {

        state ={
          nfs:[],
          new: false,
          newMsg:false
      }

      componentDidMount() {
      //  console.log(socket)
      //  setInterval(() => {
      socket.emit('identity', this.props.auth.user.id)
          this.props.getNotifications('footer')
         // this.props.getUsersToSendMessageTo()
        // console.log(this.props.auth.user.id)
       // }, 20000);
      }

      componentWillReceiveProps(np){
       //console.log(np)
       

         
         
        this.setState({
          nfs: np.notifications.notifications,
          newMsg: np.users.users && this.checkForNew(np.users.users),
          new: this.checkForNew(np.notifications.notifications)
        })
        

      }



      checkForNew = (e)=>{
       // console.log(e)
        return  e.some((nf)=>{
              if(nf.seen === false){
                  return true
          }
         // console.log(nf)
              return false
          })
      }
  render() {
    return (
      <footer className="footer" >
        <div className='navbar-holder'>
          <ul className="nav " >
        
            <li> <Link to="/notifications" className="header-brand nf-icons"><FiBell className="icons-x" />{ this.state.new && <GoPrimitiveDot className='tini-icon-nfy'/>}</Link></li>
            <div className='v-spacer'/>
            <li className=""><Link to="/search"  className="header-brand"><FiSearch className="icons-x" /></Link></li>
            <div className='v-spacer'/>
            <li className="link-class"><Link to="/feed"  className="header-brand"><div className="home-icon"><GoHome className="selectedicon" /></div></Link></li>
            <div className='v-spacer'/>
            <li className=""><Link to='/message' className="header-brand"><FiMail className="icons-x" />{ this.state.newMsg && <GoPrimitiveDot className='tini-icon-nfy'/>}</Link></li>
            <div className='v-spacer'/>
            <li className=""><Link to = '/settings'  className="header-brand"><FiSettings  className="icons-x"/></Link></li>
          </ul>
        </div>
      </footer>
  )
    }
}
const mapStateToProps = ( state ) => ({
  notifications: state.NOTIFICATION,
  users:state.users,
  auth:state.auth
});
export default connect( mapStateToProps, { getNotifications, getUsersToSendMessageTo, socket } )( Footer );

