import React from 'react';
import Media from './media';

import { MdDelete} from 'react-icons/md';

import  { dateGen } from '../../utils/dateGenerator'

class RenderMessages extends React.Component {
    state = {  }
    render() {
        const {profile,showMsgOption, messages,wasPressed} = this.props
        return (
            messages.map((msg, i) =>{
             
              let d = dateGen(new Date(msg.date))
              if (msg.system) {
                return (
                  <div  key = {i} className='msg-container'>
                   
                   {
                     msg.message.text && ( <div  onClick={wasPressed}  className="chat-boble-sender ">
                        <div className="text-system ">{msg.message.text}</div>
                        <small className='msg-small'>{`${d} `}</small>
                                        </div>)
                   }
                 </div>
               )
              }
                    if(msg.sender.toString()===profile._id){

                    // console.log(`${msg.users[1].user.name} ====sent ==== ${msg.message.text}`)
                     return (
                        <div  key = {i} className='msg-container'>
                          {msg.message.media && (<Media className='messageimg-sender' image={msg.message.media}/>)}
                         {
                           msg.message.text && ( <div  onClick={wasPressed}  className="chat-boble-sender ">
                                               <div className="text-sender ">{msg.message.text}</div>{showMsgOption && <small className='msg-small'>{ `${d} ` }</small>}
                                              </div>)
                         }
                       </div>
                     )
                   }else{
                    
                   //  console.log(`talking with   ${profile._id}`)
                  
                    return (
                       <div key = {i} className='msg-container'>
                         {msg.message.media && <Media className='messageimg' image={msg.message.media}/>}

                         {
                           msg.message.text && ( <div  onClick={wasPressed} onPointerDown ={wasPressed}  className="chat-boble-reciver ">
                                                    <div className="text-reciver">{msg.message.text}</div> 
                                                 </div>)
                         }
                         {showMsgOption && <div className='message-menu' onClick={e=>this.deleteMessage(msg._id)}>Delete <MdDelete />
                         <small className=''>{ `${d} ${msg.seen ? 'seen':'sent'}` }</small></div>}
                        </div>
                         )
                   }

              })
        );
    }
}

export default RenderMessages;
