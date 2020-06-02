import React from 'react'

export default (content) => {
    return(
        <div className='card_box'>
            <div className='card_box_item_1'>

            {content.number}

            </div>
            <div className='card_box_item_2'>
                    {content.name}
            </div>
        </div>
    )
}
