import React from 'react'
//import { Link } from "react-router-dom";
import '../Messages/messages.css'
import { FaCommentAlt,  } from "react-icons/fa";
//import { socket } from "../../App";
//import {socket as sk} from '../../App'
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { IoIosArrowBack, IoMdVideocam, IoMdSend} from "react-icons/io";
import { sendGroupMessage, getGroup, joinGroup, getGroupMessages } from "../../actions/groupActions";
import { AiFillSmile, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { MdPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {TiInfoLarge} from 'react-icons/ti'
import GroupInfo from './groupInfo'
import  { SpinnerDots } from '../common/Spinner';

class GroupChat extends React.Component {
   constructor(){
     super();
  this.state = { 
        socketid : '',
        messagetxt : '',
        group : {},
        messages : [],
        isloading:false,
        isMember : false,
        anc : '',
        isAdmin : false,
        admins:[],
        showInfo:false
     }
    // this.mRef = React.createRef()
    //const messagesEnd = React.createRef()
    }
    componentDidUpdate(){
      this.scrollBottom()
    }

    componentWillReceiveProps(nextProps) {
      
    //  console.log(nextProps)
        if(nextProps.group.group.members){
             
              if(nextProps.group.group.members.length > 0){
                this.setState({messages : nextProps.message, group :nextProps.group.group , admins:nextProps.group.group.admins})
              // this.callIo()
                this.setState({isAdmin : this.findGroupMember(nextProps.group.group.admins, nextProps.auth.user.id)})
                 this.setState({isMember : this.findGroupMember(nextProps.group.group.members, nextProps.auth.user.id)})
            //   console.log(isMember)
              }
        }
          this.scrollBottom()
          //
      }
    
    componentDidMount() {

    //let socket = sk.connect()
     //const groupid = this.props.match.params.id.toString()
       // this.props.getGroupMessages(this.props.match.params.id);
    this.props.getGroup(this.props.match.params.id);
    this.props.getGroupMessages(this.props.match.params.id)
     
    /* socket.on(`${groupid}-new_user_joined`, data=>{
       let ann = this.shownewuser(data)
       this.setState({anc : ann})
      // console.log(data)
     })
     socket.on(`${groupid}-message`, data=>{
    //  console.log(data)
      if(Object.keys(this.state.messages).length > 0 && Object.keys(data).length > 0){
        this.setState({messages : [...this.state.messages, data]})
       // console.log(this.state.messages)
       }else{
        this.setState({messages : data })
       }
    })
     socket.emit(`user_joined`, this.props.match.params.id, this.props.auth.user)
     this.scrollBottom();*/
    }

   // componentWillUnmount() {
    //  sk.socket.disconnect()
    //}

    findGroupMember(member, userId){
    
      if(member.length > 0){
        if(member.filter(e => e._id === userId).length > 0) {
      //    console.log(member, userId)
          return true;
        } else {
          return false;
        }
      }
    }

    handlegoback = ()=>{
      this.props.history.push('/message')
    }

    scrollBottom = () => {
            this.messagesEnd.scrollIntoView();
    }

    handlejoinGroup = () =>{
      this.props.joinGroup(this.state.group._id)
    }

    handleSendMessage = () => {
      
            const { messagetxt } = this.state;
            if (messagetxt.trim() === "") {
              this.setState({ error: true });
              return;
            }
            //console.log( messagetxt)
            this.props.sendGroupMessage(this.props.match.params.id,  messagetxt);
            this.setState({ messagetxt: "" });
            this.scrollBottom()
    };

    shownewuser = (user)=>{
      let msg = `${user} joinded the chat`
      return <div className='chat-ann'>{msg}</div>
    }

    renderMesages=( messages)=>{
          // console.log(messages)
            let msgb
            let megt = messages.map(msg =>{
          //    console.log(msg)
                // msg.users[1].user._id.toString()===group._id
                    if(msg.sender._id.toString() !== this.props.auth.user.id.toString()){
                      msgb = (
                      <div key = {msg._id}  className='group-chat-message-container'>
                        <Link to={`/profile/${msg.sender._id}`}>
                          <Avatar className='chat-avatar' src={`/${msg.sender.userImageData}`} style={{width: 20,  height: 20, marginTop: 1 +'rem'}}  alt={msg.sender.name}/></Link>
                        <div  className="chat-boble-sender ">
                        <div className='group-chat-message-name'>{msg.sender.handle}</div>
                        {msg.message.text} 
                        </div>
                      </div>
                        )
                    }else{
                    //  console.log(`talking with   ${group._id}`)
                      msgb = (
                          <div key = {msg._id} className="chat-boble-reciver ">
                              {msg.message.text}
                          </div>
                          )
                    }
                return msgb
            });
            return megt
    }

    togleShowInfo =()=>{
      this.setState({showInfo: !this.state.showInfo})
    }
    render() {
          const {group,showInfo, messagetxt,  messages} = this.state

        return (
        <div>
          {showInfo? <GroupInfo toggleinfo={this.togleShowInfo} group={group}/>:null}
           <div id="chat" >
           {!this.props.group.loading ? <div className="chat-title">

                <IoIosArrowBack onClick = {this.handlegoback} className='icons title-div'/>
              
               <div>
                 
                    <Avatar onClick={this.togleShowInfo} alt={group.name} src={`/${group.groupImage}`} />
                  
               </div>

               <div className='title-div'>

                 {group.name}

               </div>

               <div className='spacer'/>

               <TiInfoLarge onClick={this.togleShowInfo} className='icons title-div'/>
               <MdPhone className='icons title-div'/>
               <IoMdVideocam  className='icons title-div'/>

            </div>: null}


            <div className="messages">
            <div style={{marginBottom:3 +`rem`}}/>
             
               {!this.props.group.loading ? <div id="messages-content" >
                      {this.state.isMember ? messages.length <= 0 ? (<div style={{textAlign: 'center'}}><small><FaCommentAlt/>Start a new conversation..</small></div>) 
                      : this.renderMesages( messages) : <div style={{textAlign: 'center'}} onClick={this.handlejoinGroup}>join group<AiOutlineUsergroupAdd/></div>}
                      {this.state.anc}
                </div>: <SpinnerDots/>}
                <div style={{ float:"left", clear: "both" }}
                      ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>


            {this.state.isMember ? 
            (<div className="message-box">
              <div className="spacer"/>
                <button type="submit"   className="message-submit"><AiFillSmile className='icons-xx'/> </button> 
                <div className="spacer"/>
                <textarea type="text" value={messagetxt} onChange={e => this.setState({ messagetxt: e.target.value })} className="message-input" placeholder="Type message..."></textarea>
                <div className="spacer"/>
                <button type="submit"  onClick={this.handleSendMessage} className="message-submit"><IoMdSend className='icons-xx'/></button>
                <div className="spacer"/>
            </div>): null}
        </div>
       
        </div>
        );
    }
}
GroupChat.propTypes = {
    auth: PropTypes.object.isRequired,
    sendGroupMessage: PropTypes.func.isRequired,
    getGroupMessages: PropTypes.func.isRequired,
    joinGroup: PropTypes.func.isRequired,
    getGroup : PropTypes.func.isRequired,
    group :  PropTypes.object.isRequired,
    message: PropTypes.array.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    group : state.groups,
    message:state.groups.messages
  });
export default connect(mapStateToProps, {joinGroup, sendGroupMessage, getGroup, getGroupMessages })(GroupChat);