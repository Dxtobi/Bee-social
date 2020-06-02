import React from 'react'
//import { Link } from "react-router-dom";
import './messages.css'
//import { socket } from "../../App";
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Media from './media';
import {connect} from 'react-redux';
import { IoIosArrowBack, IoMdVideocam, IoMdSend} from "react-icons/io";
import { getProfileByHandle } from '../../actions/profileActions';
import { sendMessage , getMessages, deleteMessage, setTypingTrue } from "../../actions/messageAction";
import { AiFillSmile } from 'react-icons/ai';
import { MdPhone , MdDelete} from 'react-icons/md';
import  { SpinnerDots } from '../common/Spinner';
import  { dateGen } from '../../utils/dateGenerator'
import MP from './MediaPreviw';
//import moment from  'moment'

let formobj = new FormData()
let msgc = []

let socket = io.connect('/conversation')
class Conversation extends React.Component {
   constructor(){
     super();
  this.state = { 
        socketid : '',
        messagetxt : '',
        profile : {},
        messages : [],
        isloading:true,
        showMsgOption :false,
        messageImages:[],
        reload:false
     }
    // this.mRef = React.createRef()
    //const messagesEnd = React.createRef()
    }
componentDidUpdate(){
      this.scrollBottom()
}
componentWillReceiveProps(nextProps) {
     // console.log(nextProps.messages)
      if(nextProps.messages.sent){
         this.clearFORMDATA()
      }
      if(nextProps.messages.loading === false ) {
       // console.log(nextProps)
          this.setState({isloading : false, profile : nextProps.profile.profile})
          if(nextProps.messages){
            
              msgc = nextProps.messages
             // messages = msgc
             
              this.setState({messages : nextProps.messages.messages})
          }
          
          if(msgc.length > 0){
            this.setState({messages : msgc})
            }
           // console.log(this.state.messages)
          this.scrollBottom()
          //
          
        }
      }
//componentWillMount(){
 
  //this.setState({isloading : true, profile : {}, messages :[]})
//}
componentDidMount() {
  //console.log('mount')
 
     //this.setState({ isloading: false})
      //const idtostring = `${this.props.auth.user.id}-${this.props.match.params.id}-message`
      //console.log(idtostring)
      socket.on('ID', ()=>{
        socket.emit('USER_ID', this.props.auth.user.id)
      })
     socket.on(/*idtostring*/'MESSAGE', data => {
        console.log("resiving..............")
        if(Object.keys(this.state.messages).length > 0 && Object.keys(data).length > 0){
         this.setState({messages : [...this.state.messages, data]})
       // console.log(this.state.messages)
        }else{
         this.setState({messages : data })
        }
     //   console.log(data)
      })
      if(this.props.match.params.id) {
        this.props.getProfileByHandle(this.props.match.params.id);
        this.props.getMessages(this.props.match.params.id);
      }
     this.scrollBottom();
}
componentWillUnmount() {
  socket.emit('disconnect')
  //io.Socket.close()
}
handlegoback = ()=>{
  this.setState({isloading : true, messages :[],  profile : {} })
  this.props.history.goBack()
}
scrollBottom = () => {
        this.messagesEnd.scrollIntoView();
}
wasPreesed = () =>{
 // console.log('pressed---')
  this.setState({showMsgOption : !this.state.showMsgOption})
}
deleteMessage=(id)=>{
 // console.log(id)
 this.props.deleteMessage(id)
}
onClickMessage=(id)=>{
  this.setState({showMsgOption:false})
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
 // formobj.append('postImageData', e.target.files[0])
 //console.log(this.state.messageImage)
  //this.setState({[e.target.name]: e.target.value});
  
 }
handleSendMessage = (e) => {
  e.preventDefault();
        const { messagetxt,  profile, /*messageImage*/} = this.state;
        if (messagetxt.trim() === "" && this.state.messageImages.length < 1) {
          this.setState({ error: true });
          return;
        }
        let userId = profile._id
        formobj.append('text', messagetxt);
        formobj.append('id', userId);

       // console.log(this.state)

        let msg ={
            message: {text: messagetxt},
            users: [this.props.auth.user.id, userId],
            _id: this.props.auth.user.id + new Date(),
            sender: this.props.auth.user.id,
            date: new Date(),
            to:userId,
          }
         
        this.setState({ messagetxt: "" });
        this.setState({ messageImages: [] });
        socket.emit('SEND', msg)
       // this.setState({ reload:true });
        this.props.sendMessage(formobj, userId);
       // console.log(formobj.get('text'))
        this.scrollBottom()
        
};
handleFocus = () =>{
  this.props.setTypingTrue()
}

clearFORMDATA= ()=>{
  formobj.delete('id')
  formobj.delete('text')
  formobj.delete('msgimg')
 // console.log(formobj)
}

renderMesages=(profile, messages)=>{
       // console.log(messages)
        let msgb
        let megt = messages.map(msg =>{
         
            if (messages.length > 0 || profile !== null || profile !== undefined ) {
             
             // msg.users[1].user._id.toString()===profile._id
            // console.log(msg.message.media, msg.message.text)
                 if(msg.sender.toString()===profile._id){
                   
                   let d = dateGen(new Date(msg.date))
                 // console.log(`${msg.users[1].user.name} ====sent ==== ${msg.message.text}`)
                  msgb = (
                     <div  key = {msg._id} className='msg-container'>
                       {msg.message.media?<Media className='messageimg-sender' image={msg.message.media}/>:null}
                       <div className="chat-boble-sender ">
                         <div className="text-sender ">{msg.message.text}</div>  <small className='msg-small'>{ ` ▶️${d}` }</small>
                       </div>
                    </div>
                  )
                }else{
                 
                //  console.log(`talking with   ${profile._id}`)
                let d = dateGen(new Date(msg.date))
                  msgb = (
                    <div key = {msg._id} className='msg-container'>
                      {msg.message.media? <Media className='messageimg' image={msg.message.media}/>:null}
                      {this.state.showMsgOption ? <div className='message-menu' onClick={e=>this.deleteMessage(msg._id)}>Delete <MdDelete /></div>:null}
                      <div  onClick={this.onClickMessage} onPointerDown ={this.wasPreesed}  className="chat-boble-reciver ">
                      <div className="text-reciver">{msg.message.text}</div> <small className='msg-small'>{ ` ▶️${d}` }</small>
                      </div>
                     </div>
                      )
                }
              
            
            }return msgb
        });
        return megt
}
    render() {
          const {profile, isloading, messagetxt, messageImages, messages} = this.state
          //{reload?this.clearFORMDATA:null}
         //console.log(messageImages)
       
         return (
         <div>
       
            <div id="chat" >
            <div className="chat-title">
               
                <IoIosArrowBack onClick = {this.handlegoback} className='icons title-div'/>
              
               <div className="chat-avatar">
                 <Link to ={`/profile/${profile._id}`}><Avatar alt={profile.name} src={`/${profile.userImageData}`} /></Link>
                 
               </div>
               <div className='title-div'>
                {isloading || profile.firstname===undefined ? ' ' :`${profile.firstname} ${profile.secondname}`}
               </div>
               <div className='spacer'/>
               <MdPhone style={{display:'none'}} className='icons title-div'/>
               <IoMdVideocam  style={{display:'none'}} className='icons title-div'/>
            </div>


            <div className="messages">
            <div style={{marginBottom:3 +`rem`}}/>
                <div id="messages-content" >
                      {isloading || profile.firstname===undefined ? <SpinnerDots/> : this.renderMesages(profile, messages)}
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
    deleteMessage : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    messages : state.users
  });
export default connect(mapStateToProps, {getProfileByHandle, deleteMessage, sendMessage, setTypingTrue, getMessages })(Conversation);