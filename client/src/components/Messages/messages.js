import React from 'react';
//import {FiMail} from 'react-icons/fi'
import { getUsersToSendMessageTo,clearMsg } from "../../actions/messageAction";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleUser from './message_single';
import SingleGroup from '../createGroup/groups';
import { getUserGroup  } from '../../actions/groupActions';
import { TiGroup, TiUser} from 'react-icons/ti';
import { SpinnerDots } from '../common/Spinner';

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
         // console.log(nextProps)
          if(nextProps.users.loading===false ){
            
            let all = []
            let users = nextProps.users.users, hash =Object.create(null)
            users.forEach((u)=>{
              let key = JSON.stringify(u);
              hash[key] =(hash[key]||0)+1;
              if(hash[key]>=2){
                return null
              }else{
                return all.push(JSON.parse(key))
              }
            })


            //setToOne(nextProps.users.users)

           // console.log(users, all)
            this.setState({ usersToSendTo: nextProps.users.users });}

         // console.log(this.state.usersToSendTo)
         // console.log(nextProps)
        }
      
        handletugletogroup=()=>{
          this.setState({ showgroup: true})
        }
        handletugletousers=()=>{
          this.setState({ showgroup: false})
        }
        
        render(){
    
          const { usersToSendTo } = this.state;
          const { groups } = this.props.groups;
          return (
                <div className="messages_wrapper">
                 
                  <div className="msg-top-nav">
                      <TiUser onClick = {this.handletugletousers} className='icons-xx' />
                      <div style={{marginLeft: 45}}/>
                      <TiGroup onClick = {this.handletugletogroup} className='icons-xx'/>
                      <div className='spacer'/>
                   </div>
                 { this.state.showgroup?(
                   <div className="group-holder">

                     {!this.props.users.loading? groups.groupsPartOff.map((group, i )=>{
                      return <SingleGroup key={i} group={group}/>
                     }):<SpinnerDots/>}
                    </div>
                 ):
                 (
                  <div className="users-holder">
                    {!this.props.users.loading? usersToSendTo.map((user, i )=>{
                      return <SingleUser key={i} resiver={this.props.auth.user.id} user={user}/>
                    }):<SpinnerDots/>}
                  </div>
                 )
                 }
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