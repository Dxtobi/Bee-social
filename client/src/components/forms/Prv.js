import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { Avatar } from '@material-ui/core'



export default (props) => {
    console.log(props)
    return(
        <div className='prevw-container'>
            
            <div>
                <Avatar src='' alt='' />
            </div>
            <div>
                <div className='prevw-header'>
                        <div className='prevw-header-name'>
                            <div>{props.state.companyName}</div>
                            <div>{props.state.webSites}</div>
                        </div>
                        <div className='prevw-header-date'>
                            12:44
                        </div>
                </div>
                <div className='prevw-tags'>
                {
                    props.state.tags.map(tag=>{
                        return(
                            <div  key={tag} >
                               
                                    #{tag}
                                
                                
                            </div>
                        )
                    })
                }
                </div>
                    {props.state.info}

               </div>
               <div><IoIosCloseCircle className='icons-xx' onClick={e=>props.close()}/> Close</div>
        </div>
    )
}
