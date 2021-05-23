import React from 'react'
//import { Link } from "react-router-dom";
import './messages.css'
import {Link, Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
//import Media from './media';
import {connect} from 'react-redux';
import { IoIosArrowBack, IoMdSend} from "react-icons/io";
import { getProfileByHandle } from '../../actions/profileActions';
import { sendMessage, getMessages, deleteMessage, setTypingTrue, seenMessage } from "../../actions/messageAction";
import { socketNewMessage} from "../../actions/socketIo";
import { AiFillSmile } from 'react-icons/ai';
import  { SpinnerDots } from '../common/Spinner';
//import  { dateGen } from '../../utils/dateGenerator'
import MP from './MediaPreviw';
import RenderMsg from  './RenderMsg'
import {socket} from '../../utils/socketGlobal';
let formobj = new FormData()


//let socket = null//io.connect('/conversation')
class Conversation extends React.Component {

 
   state = { 
      socketid : '',
      messagetxt : '',
      profile : {},
      messages : [],
      isLoading:true,
      showMsgOption :false,
      messageImages:[],
      reload: false,
      lastMessageId: '',
      typing: false,
      in: false,
      notfound:false
   }
   
 
  componentWillReceiveProps(nextProps) {


      if(nextProps.messages.sent){
         this.clearFORMDATA()
    }
      if (this.props.location.state===undefined) {
        return this.setState({notfound:true})
      }
      if(nextProps.messages.loading === false && this.props.location.state ) {
      
          this.setState({isLoading : false, profile : nextProps.profile.profile})
          if(nextProps.messages ){
          
            let all = []
            let all_msg = nextProps.messages.messages, hash =Object.create(null)
            all_msg.forEach((u)=>{
              let key = JSON.stringify(u);
              hash[key] =(hash[key]||0)+1;
              if(hash[key]>=2){
                return null
              }else{
                return all.push(JSON.parse(key))
              }
            })
            this.setState({messages : all, lastMessageId:nextProps.messages.messages[nextProps.messages.messages.length - 1]._id})

          }
           // console.log(this.state.messages)
          this.scrollBottom()
          //
        }

  this.scrollBottom();
      }


  
  componentDidMount() {
    this.scrollBottom()
    if (this.props.location.state===undefined) {
      return this.setState({notfound:true})
    }
    this.clearFORMDATA()

        this.props.getMessages(this.props.match.params.id);
         
  

      let room = this.props.match.params.id;
      let otherUsersId 
  if (this.props.location.state){
    this.props.seenMessage(this.props.location.state.id)
    this.props.getProfileByHandle(this.props.location.state.id);
    otherUsersId = this.props.location.state.id
  }
  
    socket.emit('subscribe', room, otherUsersId);

  socket.on('in', () => {
    this.setState({in:true})
  })

  socket.on('out', () => {
    this.setState({in:false, typing:false})
  })

  socket.on('notTyping', () => {
    this.setState({ typing:false})
  })

  socket.on('typing',()=>{
    this.setState({typing:true})
  })

  socket.on('incoming_message', (e) => {
    if (e.message._id === this.state.lastMessageId) {
      console.log('same',)
      return
    } else {
      this.addNewMessage(e)
    }

    this.scrollBottom();
  })
 
     this.scrollBottom();
}

  componentWillUnmount() {
  this.clearFORMDATA()
    socket.emit('unsubscribe', this.props.match.params.id)
}


addNewMessage = (e) => {
    this.props.socketNewMessage(e)
  }
handlegoback = ()=>{
  this.setState({isLoading : true, messages :[],  profile : {}, typing:false })
  this.props.history.goBack()
}
scrollBottom = () => {
  if (this.messagesEnd) {
    this.messagesEnd.scrollIntoView();
    }
}
wasPressed = () =>{
 // console.log('pressed---')
  this.setState({showMsgOption : !this.state.showMsgOption})
}
deleteMessage=(id)=>{
 // console.log(id)
 this.props.deleteMessage(id)
}
handleSelectImg(e){
  let imgs = []
  for (let index = 0; index <  e.target.files.length; index++) {
    formobj.append('msgimg', e.target.files[index]);
    imgs.push( URL.createObjectURL(e.target.files[index]))
  }
  if(imgs.length > 0){
    this.setState({
      messageImages : imgs
    })
  }

 }
handleSendMessage = (e) => {
  e.preventDefault();
        const { messagetxt,  profile, /*messageImage*/} = this.state;
        if (messagetxt.trim() === "" && this.state.messageImages.length < 1) {
          this.setState({ error: true });
          window.alert('error no message to send')
          return;
        }
        let userId = profile.user._id
        formobj.append('text', messagetxt);
        formobj.append('id', userId);
        formobj.append('conversationId', this.props.match.params.id);
        this.setState({ messagetxt: "" , typing: false,  messageImages: []});
        this.props.sendMessage(formobj, this.props.match.params.id);
        this.scrollBottom()
        socket.emit('notTyping', this.props.match.params.id)
};
handleFocus = () =>{
  socket.emit('typing', this.props.match.params.id)
  this.props.getMessages(this.props.match.params.id);
  this.scrollBottom()
}

clearFORMDATA= ()=>{
  formobj.delete('id')
  formobj.delete('text')
  formobj.delete('msgimg')
  formobj.delete('conversationId')
 // console.log(formobj)
}


    render() {
          const {profile, isLoading, messagetxt, messageImages, messages} = this.state
         let profileUser = profile.user ? profile.user : profile

            if (this.state.notfound) {
              return <Redirect to={'/notfound'}/>
          }
           if (isLoading || profileUser.handle === undefined ) {
            return <SpinnerDots /> 
           }
      
      return (
        <div>
      
           <div id="chat" >
           <div className="chat-title">

             <div className="chat-title-container">
             <IoIosArrowBack onClick = {this.handlegoback} className='icons title-div'/>
                 <div className="chat-avatar">
                   <Link to ={`/profile/${profileUser._id}`}><Avatar alt={profileUser.name} src={`/${profileUser.userImageData}`} /></Link>
                 </div>
                 <div className='title-div'>
                   <div>{`${profileUser.handle}`}</div>
                    <div style={{color:this.state.in ?'green':'goldenrod'}} className='in_out_ind'>{this.state.in ? 'Live': 'out'}</div>
                 </div>
             </div>
              
                <div className='active-user-indicator'>
                   <div style={{color:this.state.in ?'green':'goldenrod'}} >{this.state.typing ? 'typing..': this.state.in ? 'reading..': 'busy'}</div>
                </div>
           </div>


           <div className="messages">
           <div style={{marginBottom:3 +`rem`}}/>
               <div id="messages-content" >
                  <RenderMsg showMsgOption={this.state.showMsgOption}
                    profile={profileUser}
                    messages={messages}
                    wasPressed={this.wasPressed}
                    
                    />
               </div>
               

               <MP images={messageImages}/>
               <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
               </div>
           </div>
           <form onSubmit={this.handleSendMessage} encType='multipart/form-data'>
             <div className="message-box">
             
                 <div className="spacer"/>
                 <div  className="post -input-buttons">
                   <label>
                   <input type="file" className="file-input"  name='msgimg' onChange={(e)=>this.handleSelectImg(e)} multiple/>
                       <div className='post-preview-img'>
                         <div  className="message-submit"><AiFillSmile  className='icons-xx'/> </div> 
                       </div>
                       
                   </label>
                 </div >
                 <div className="spacer"/>
                 <textarea type="text" value={messagetxt} onFocus={this.handleFocus} onChange={e => this.setState({ messagetxt: e.target.value })} className="message-input" placeholder="Type message..."></textarea>
                 <div className="spacer"/>
                 <button type="submit"  onClick={ this.handleSendMessage} className="message-submit"><IoMdSend className='icons-xx'/></button>
                 <div className="spacer"/>
           
             </div>
              </form> 
       </div>
      
       </div>
       );
    }
}
Conversation.propTypes = {
    auth: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    setTypingTrue:PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
 // socket : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    messages : state.users
  });
export default connect(mapStateToProps, { seenMessage, getProfileByHandle, deleteMessage, sendMessage, setTypingTrue, getMessages, socketNewMessage })(Conversation);