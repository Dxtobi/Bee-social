import React from 'react';
import {getExtention, /*getImgUrl*/} from '../../utils/fileExtention'
import { IoIosArrowBack } from 'react-icons/io';
//import { Link } from 'react-router-dom';

export default class Media extends React.Component{
    state={
        image:[],
        className:'',
        spacer:'v-spacer',
        imgContaner:'img-container',
        showfull:false
    }

    componentDidMount() {
        const { image, className } =this.props
        this.setState({
            image:image,
            className:className,
           
        })
    }

    togleShowFull=()=>{
        const { className } =this.props
        this.setState({
            className:className+' full-img',
            spacer:'img-drop',
            imgContaner:'',
            showfull:true
        })

       /// console.log('updated')
    }

    togleShowFullRemove=()=>{
        const { className } =this.props
        this.setState({
            className:className,
            spacer:'v-spacer',
            imgContaner:'img-container',
            showfull:false
        })

       // console.log('updated removed')
    }
   
    render(){

       const { image, className, spacer,  showfull, imgContaner} = this.state
      // console.log(className)
             return(
                 <div>
                     {
                            image.map((img, i)=>{
                                    let o
                                    let x = getExtention(img)
                                    //let u = getImgUrl(img)
                                    if(x === 'jpeg' || x === 'png' || x === 'PNG' || x === 'JPEG' || x === 'jpg' || x === 'JPG' || x === 'gif' || x === 'GIF'){
                                        o = (
                                            <div key = {i} className={className}>
                                               {/*<Link to={`/fullimage/${img}`}> <img alt='' src={`/${img}`}/> </Link> */}
                                               <div onClick={this.togleShowFullRemove} className={spacer}/>
                                               {
                                                  showfull ? <button onClick={this.togleShowFullRemove} className='img-go-back'><IoIosArrowBack className='btn-icons'/></button>:null
                                               }
                                               <div className={imgContaner}><img alt='' src={`/${img}`} onClick={this.togleShowFull}/></div>
                                            </div>
                                        )
                                    }
                                    return o
                                })
                     }
                 </div>
                )
    }
    
}
