import React from 'react'
//import { Link } from 'react-router-dom'
export default (content) => {
    //console.log(content)
    return(
        <div className='a-list' onClick={e=>content.changeFun(<content.content.component />)}>
            <div to={`${content.content.path}`} className='a-link-list'>
            <div >

            {content.content.name}

            </div>
            <div >
                    {content.content.icon ? <content.content.icon className='icons'/> :null}
            </div>
            </div>
        </div>
    )
}