import React from 'react'

export default (content) => {
    return(
        <div className='a-butten'>
            {content.icon ? <content.icon className='icons'/>: content.text}
        </div>
    )
}