import React from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import TextFieldGroup from '../../../../../../../components/common/TextFieldGroup'



export function UserDisplay(props){
    console.log(props)
    return(
        <div className=''>
           {
               props.users.map((user, i)=>{
                   return(
                       <div  key={i} className='a-user-holder'>
                           <Link to={`/profile/${user.User._id}`}><Avatar src={`/${user.User.userImageData}`} alt=''/></Link>
                           
                               {`  ${user.User.firstname} ${user.User.secondname} @${user.User.handle}`}
                           
                           <div>
                               {
                                   user.is === 'Admin' ? <small onClick={e=>props.editAdmin(user.User._id)} className='btn-normal'>admin</small> 
                              
                                   : user.is === 'Request premium' ? <small className='btn-normal' onClick={e=>props.approveProProfile(user.User._id)}>Request premium</small>
                                
                                   :user.is === 'PreviosProAccount' ? <small className='btn-normal' onClick={e=>props.approveProProfile(user.User._id)}>Removed Premium Account</small>
                                
                                   :<small className='btn-normal' onClick={e=>props.approveProProfile(user.User._id)}>Premium Account</small>
                               }
                           </div>
                       </div>
                   )
               })
           }
        </div>
    )
}

export function UserRegister(props){
    return(
        <div className=''>
           <TextFieldGroup
              placeholder='First Name'
              name={props.values.firstname}
              value={props.values.firstname}
              onChange={e=>props.onchangeEvent(e)} 
           />
           <TextFieldGroup
              name={props.values.secondname}
              value={props.values.secondname}
              onChange={e=>props.onchangeEvent(e)} 
              placeholder='Second Name'
           />
           <TextFieldGroup
              placeholder='Handle'
              name={props.values.handle}
              value={props.values.handle}
              onChange={e=>props.onchangeEvent(e)} 
           />
           <TextFieldGroup
              placeholder='Email'
              name={props.values.email}
              value={props.values.email}
              onChange={e=>props.onchangeEvent(e)} 
           />
           <TextFieldGroup
              name={props.values.password}
              value={props.values.password}
              onChange={e=>props.onchangeEvent(e)} 
              placeholder='Password'
              label='Password'
           />
        </div>
    )
}