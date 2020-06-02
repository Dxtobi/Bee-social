import React from 'react';
import {Link} from 'react-router-dom'
import {Avatar} from '@material-ui/core'
//import { dateGen } from '../../utils/dateGenerator';
//import moment from 'moment'


export default function SingleUser( user ){
//console.log(user)
  return (
    <Link to={`/conversations/${user.user.id}`}>
        <div className='user-list-holder'>
          <div className='user-list-holder-avatar'>
            <Avatar alt={user.user.name} src={user.user.img} />
          </div>
          <div>
              <div className='user-list-holder-name'>
                {user.user.handle}
                  <small className='msg_sub'>{user.user.sender === user.resiver ? 'you' : user.user.messageHandle} : {user.user.message === "" ? <div className='msg_img'> <img alt='' src={`/${user.user.messageimg}`}/></div>: user.user.message}</small>
              </div>
          </div>
          <div className='v-spacer'/>
          <small style={{paddingTop:5}}>{user.user.date}</small>
        </div>
    </Link>
  )
}