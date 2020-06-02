import React from 'react'
import Buttens from './Buttens'
export default (content) => {
    return(
        <div className='list'>
            <div className='list_item_1'>

            {content.avatar}

            </div>
            <div className='list_item_2'>
                    {content.name}
            </div>
            <div className='list_item_2'>
                    <Buttens onClick = {content.function}/>
            </div>
        </div>
    )
}