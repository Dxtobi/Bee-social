import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'



export default (props) => {
    return(
        <div className=''>
           {
               props.tags.map(tag=>{
                   return(
                       <div  key={tag._id} className='a-tag-holder'>
                           <div className='tags'>
                            #{tag.name}
                           </div>
                           <IoIosCloseCircle className='icons' onClick={e=>props.delete(tag._id)}/>
                       </div>
                   )
               })
           }
        </div>
    )
}
