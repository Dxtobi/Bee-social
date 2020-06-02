import React from 'react';
//import {getExtention} from '../../utils/fileExtention'

export default class MP extends React.Component{
   

    render(){
        const { images } =this.props
      ///  console.log(this.props)
             return(
                 <div className='preview-img'>
                     {
                            images.map((img, i)=>{
                                    let o
                                   // let x = getExtention(img)
                                    //if(x === 'jpeg' || x === 'png' || x === 'PNG' || x === 'JPEG' || x === 'jpg' || x === 'JPG' || x === 'gif' || x === 'GIF'){
                                        o = (
                                            <div key = {i} >
                                                <img alt='' src={img}/>
                                            </div>
                                        )
                                    return o
                                })
                     }
                 </div>
                )
    }
    
}
