import React from 'react'
import './messages.css'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { IoIosArrowBack, IoMdVideocam, } from "react-icons/io";
import { getProfileByHandle } from '../../actions/profileActions';
import {  getMessages,  startConversation, getConversation } from "../../actions/messageAction";
import { MdPhone } from 'react-icons/md';
import { SpinnerDots } from "../common/Spinner";



//let socket = null//io.connect('/conversation')
class ConversationChecker extends React.Component {
   
  state = { 
        socketid : '',
        messagetxt : '',
        profile : {},
        messages : [],
        isloading:true,
        showMsgOption :false,
        messageImages:[],
        reload:false
     }

componentWillReceiveProps(nextProps) {
    //  console.log(nextProps.messages)
      if(nextProps.messages.loading === false ) {
       // console.log(nextProps)
          this.setState({isloading : false, profile : nextProps.profile.profile, messages:nextProps.messages.messages})
        }
  
      }


componentDidMount() {
  if (this.props.match.params.id) {
        this.props.getProfileByHandle(this.props.match.params.id);
     // this.props.getMessages(this.props.match.params.id);
      this.props.getConversation(this.props.match.params.id, this.props.history)
      }
}

handlegoback = ()=>{
  this.setState({ messages :[],  profile : {} })
  this.props.history.goBack()
}

handleSendMessage = (e) => {
  e.preventDefault();
        const {   profile, /*messageImage*/} = this.state;

        let userId = profile.user._id
        this.props.startConversation(userId, this.props.history);
};





    render() {
          const {profile, isloading} = this.state
          let profileUser = profile.user ? profile.user : profile

          if (isloading || profileUser.handle === undefined ) {
            return <SpinnerDots /> 
          }
          
        return (
            <div>
                <div id="chat" >
                    <div className="chat-title">

                        <IoIosArrowBack onClick={this.handlegoback} className='icons title-div' />

                        <div className="chat-avatar">
                            <Link to={`/profile/${profileUser._id}`}><Avatar alt={profileUser.name} src={`/${profileUser.userImageData}`} /></Link>
                        </div>
                        <div className='title-div'>
                            {`${profileUser.handle}`}
                        </div>
                        <div className='spacer' />
                        <MdPhone style={{ display: 'none' }} className='icons title-div' />
                        <IoMdVideocam style={{ display: 'none' }} className='icons title-div' />
                    </div>

                    
                    <div className='con-div'>
                        <p>you have no recent conversation with this person</p>
                        <button onClick={this.handleSendMessage} className='con-btn'>Start conversation</button>
                    </div>
           
                </div>
   
            </div>
        );
    }
}
ConversationChecker.propTypes = {
    auth: PropTypes.object.isRequired,
    getMessages: PropTypes.func.isRequired,
   // deleteMessage : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    messages : state.users
  });
export default connect(mapStateToProps, { getProfileByHandle, startConversation, getMessages, getConversation })(ConversationChecker);