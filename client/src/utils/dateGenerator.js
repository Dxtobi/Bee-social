
export const dateGen =(p)=>{
   //let day = p.getDay();
  // let das = new Date()

 //  let s = das.getUTCDay()
  //console.log(p)
     let m =p.getMonth();
      let d =p.getDate();
       let y = p.getFullYear()
 if(m < 10){
     m = '0'+m
 }
 if(d<10){
     d='0'+d
 }

 let fd = `${d}/${m}/${y}`
    //  let wd = findWd(day)
  //  console.log(fd, p, wd, s, day)
    return fd
}

/*function findWd(params) {
    console.log(params)
    let wd 
    switch (params) {
        case 1:
            wd = 'Sun'
            break;
        case 2:
            wd = 'Mon'
            break;
        case 3:
            wd = 'Tue'
            break;
        case 4:
            wd = 'Wed'
            break;
        case 5:
            wd = 'Thu'
            break;
        case 6:
            wd = 'Fri'
            break;
        case 7:
             wd = 'Sat'
            break;
        default:
            wd = '--/'+params
            break;
    }
    return wd
}*/