import React from 'react';

import {Link} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';

export default function SingleGroup( group ){

  return (
    <Link to={`/groupchat/${group.group._id}`}>
        <div className='user-list-holder'>
          <div className='user-list-holder-avatar'>
            <Avatar alt={group.group.name} src={group.group.groupImage} />
          </div>
          <div>
            <div className='user-list-holder-name'>
              {group.group.name}
              <small>{group.group.info}</small>
            </div>
          </div>
          < div style={{margin:'auto'}}>
                <small style={{fontStyle:'italic'}}>{group.group.members.length} members</small>
          </div>
        </div>
    </Link>
  )
}