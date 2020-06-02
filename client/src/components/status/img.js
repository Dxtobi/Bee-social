import React from 'react';
//import {getExtention, /*getImgUrl*/} from '../../utils/fileExtention'


export default class Img extends React.Component{

    render(){
        const { img} =this.props
        return <img src={`/${img}`} alt ={'loading..'} />
    }


}
