import React from 'react'
//import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

//09096704336
export function Proprofiles (props){
    //console.log(props)
    
    
        return(
            <Link to={`/status/${props.user.user._id}`}>
                <div style={{marginLeft:10}} className=''>
                    <div className='proUsersbox-img-container'><img className='proUsersbox-img'  src={`/${props.user.media[0]}`} alt=''/></div>
                    <div><small>{props.user.user.handle}</small></div>
                </div>
            </Link>
        )
    
   
}