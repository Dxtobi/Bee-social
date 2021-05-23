import React from 'react';


const Model = ({message, cancelAction }) => {
    return (
        <div className='model_custom'>
            <div className='model_custom_message'>{ message}</div>
            <div onClick={cancelAction}>cancel</div>
        </div>
    )
}

export default Model 
