


import React from 'react';




export default function ImgView(props) {



  const handleimg = () => {
    props.toggleimg();
  };


  return (
    <div className='viewfullimage'>
      <img src={props.img}></img>
    </div>
  );
}









 