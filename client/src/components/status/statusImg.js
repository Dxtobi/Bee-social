import React from 'react';
//import {getExtention, /*getImgUrl*/} from '../../utils/fileExtention'

import Img from './img'
export default class StatusImg extends React.Component{



    render(){
        const { img} =this.props
        return(
            <div className='cards-slider-wrapper'>
              
               {
                   img.map((im, i) =>{
                       return <Img key={i} img={im} />
                   })
               }
               
            </div>

        )
    }
    
}
