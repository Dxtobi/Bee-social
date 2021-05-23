import React from 'react';
//import {FiMail} from 'react-icons/fi'
import { getUsersToSendMessageTo,clearMsg } from "../../actions/messageAction";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleUser from './message_single';
//import SingleGroup from '../createGroup/groups';
import { getUserGroup  } from '../../actions/groupActions';
//import { TiGroup, TiUser} from 'react-icons/ti';
//import { SpinnerDots } from '../common/Spinner';

//import moment from  'moment'
//import { FaBars} from 'react-icons/fa';

//import Sidebar from '../sidebar/sidebar';

class Messages extends React.Component {

   
        state = { 
          showgroup: false,
          test : '',
          usersToSendTo:[],
          groups:[],
          showSdebar : false,
         }

        componentDidMount() {
          this.props.clearMsg()
          this.props.getUsersToSendMessageTo();
          this.props.getUserGroup();
        }
        componentWillReceiveProps(nextProps) {
          //console.log(nextProps)
          if (nextProps.users.loading === false /* && !this.compareOldAndNew(this.state.usersToSendTo, nextProps.users.users)*/) {
              
              this.setState({ usersToSendTo: nextProps.users.users });
          }

  }

       /* compareOldAndNew = (oldArr, newArr) => {
          const oA = JSON.stringify(oldArr);
          const nA = JSON.stringify(newArr);

         // console.log(JSON.stringify(oldArr), JSON.stringify(newArr))
          if(oA === nA){
            return true
          }else{
            return false
          }
        }*/
      
        handletugletogroup=()=>{
          this.setState({ showgroup: true})
        }
        handletugletousers=()=>{
          this.setState({ showgroup: false})
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
        render(){
          const { usersToSendTo } = this.state;
          //const { groups } = this.props.groups;
          return (
                <div className="messages_wrapper">
                  <div className="users-holder">
                    { usersToSendTo.map((user, i )=>{
                      return <SingleUser key={i} resiver={this.props.auth.user.id} user={user}/>
                    })}
                  </div>
                </div>
          )
        }
    }
    
    Messages.propTypes = {
      getUsersToSendMessageTo: PropTypes.func.isRequired,
      getUserGroup:PropTypes.func.isRequired,
      users: PropTypes.object.isRequired,
      clearMsg:PropTypes.func.isRequired,
    }
    
    const mapStateToProps = state => ({
      users : state.users,
      groups : state.groups,
      auth: state.auth,
    })
    
    export default connect(mapStateToProps, { getUsersToSendMessageTo , clearMsg, getUserGroup})(Messages);