import React from 'react';
import {FaCogs} from 'react-icons/fa';
import {IoIosArrowBack}  from 'react-icons/io';
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
//import { createGlobalStyle } from 'styled-components';

export default function(props) {
  

  return (
    <div className='g-info-board'>
      <IoIosArrowBack className='icons' onClick={e=>props.toggleinfo()}/>
      <div className='g-info-top'>
           
            {
              props.group.groupImage ? (<div className='g-info-img'><img  src={`/${props.group.groupImage}`} alt=''/><div className='name-on-image'>{props.group.name}</div></div>): altimg(props.group.name)
            }
            
      </div>
      <div className='g-info-bottom'>
        <Link className='edit-group-link' to={`/edit/group/${props.group._id}`}>Edit group<br/><FaCogs className='icons'/></Link>
        {props.group.members.map(m =>{
              return (
                <div key={m._id} className='user-list-holder'>
                   <Link to={`/profile/${m._id}`}>
                      <div className='user-list-holder-avatar'>
                        <Avatar alt='' src={`/${m.userImageData}`} />
                      </div>
                   </Link>
                    <div>
                      <div className='user-list-holder-name'>
                        @{m.handle}
                      </div>
                    </div>
              </div>
              )
            })}
      </div>
    </div>
  );
} 

const altimg =(n)=>{

    return(
       <div className='g-info-alt-image-div'>
            <div className='user-list-holder-name-inner'>{n}</div>
       </div>
    )
}
