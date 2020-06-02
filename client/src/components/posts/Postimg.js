import React from 'react';
import {getExtention, /*getImgUrl*/} from '../../utils/fileExtention'
//import { IoIosArrowBack } from 'react-icons/io';
import ImgContainer from './imgcontainer';

export default class PostImg extends React.Component{

    state={
      //  displayfull:false,
        imageSrc:[]
    }

    componentDidMount() {
        const {imageSrc} =this.props
       //      console.log(imageSrc)
        
        this.setState({imageSrc  : imageSrc})
    }
    render(){
        //const { imgAlt} =this.props
       const {imageSrc, } =this.state
        //console.log(imageSrc,'==')
        return(
            <div>
                <div className={`post-image`}>
                <div className={imageSrc.length > 1 ?`post-image-wrapper`:`post-image-wrapper-single`}>
                 { 
                    imageSrc.map((img, i)=>
                    {
                     //   cheak the file extention
                        let x = getExtention(img)
                    //validate for imgs
                        if(x === 'jpeg' || x === 'png' || x === 'PNG' || x === 'JPEG' || x === 'jpg' || x === 'JPG' || x === 'gif' || x === 'GIF'){
                          //  console.log(imageSrc)

                              return  <ImgContainer key={i} img={img} />

                        }
                        else
                        {
                           let o = 'this is a video file'
                           return o
                        }
                       
                    })
                }
                </div>
            </div>
            </div>
          
        )
    }
    
}
