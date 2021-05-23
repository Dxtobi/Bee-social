import React from 'react';
import {getExtention} from '../../utils/fileExtention'

export default class MP extends React.Component{
   

    render(){
        const { images } =this.props
      ///  console.log(this.props)
             return(
                 <div className='preview-img'>
                     {
                            images.map((img, i)=>{
                                return <Media key={i} name={img}/>
                                })
                     }
                 </div>
                )
    }
    
}

const Media = ({ name }) => {
    let x = getExtention(name)
    if (x === 'jpeg' || x === 'png' || x === 'PNG' || x === 'JPEG' || x === 'jpg' || x === 'JPG' || x === 'gif' || x === 'GIF') {
        return (
            <div  >
              <img alt='' src={name} />
            </div>
        )
    } else {
        return (
            <div  >

            </div>
        )
    }
}