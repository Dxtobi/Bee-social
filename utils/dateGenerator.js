

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
"July", "Aug", "Sep", "Oct", "Nov", "Decr"
];
module.exports  =(p)=>{
    var n = p.getDay()
     let m =p.getMonth();
      let d =p.getDate();
       let y = p.getFullYear()
 
 if(d<10){
     d='0'+d
 }
let mnt = monthNames[m]
let wd = findWd(n)

 let fd = ` ${wd} ${d} ${mnt} ${y}`
   
   // console.log(wd)
    return fd
}

function findWd(params) {
    let wd 
    switch (params) {
        case 0:
            wd = 'Sun'
            break;
        case 1:
            wd = 'Mon'
            break;
        case 2:
            wd = 'Tue'
            break;
        case 3:
            wd = 'Wed'
            break;
        case 4:
            wd = 'Thu'
            break;
        case 5:
            wd = 'Fri'
            break;
        case 6:
             wd = 'Sat'
            break;
        default:
            wd = '--/'+params
            break;
    }
    return wd
}