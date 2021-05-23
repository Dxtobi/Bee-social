import React from 'react';
//import {getExtention, /*getImgUrl*/} from '../../utils/fileExtention'
import { IoIosArrowBack } from 'react-icons/io';

export default class ImgContainer extends React.Component{

    state={
        displayfull:false,
    }
    toggleFullImg=()=>{
        this.setState({displayfull  : !this.state.displayfull})
    }

    render(){
        const {img} =this.props
        return(
            <div>
                 {
                    this.state.displayfull ? <button onClick={this.toggleFullImg} className='img-go-back'><IoIosArrowBack className='btn-icons'/></button>:null
                 }
                                <img src={`/${img}`} alt ={''}  style={{borderRadius:20}} 
                                onClick={this.toggleFullImg}
                                className={this.state.displayfull?'displayfull':null}/>
                        
                    {
                        this.state.displayfull? <div className='backdrop'/>:null
                    }
            </div>             
          
        )
    }
    
}
