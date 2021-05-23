
const fs = require('fs')
const sharp = require('sharp')
const path = require('path')


/*function getExtention(filename) {
    let o = filename.slice((filename.lastIndexOf('/')-1>>>0)+2)
    //let x = filename.split('.').pop()
   // console.log(x, o)
    return o
}*/

const resize = async(array) =>{
   // let newArray=[]
 //  console.log(array,'=======')
    let y = array.length
  
    for (let index = 0; index < array.length; index++) {
      
        const {filename: image} = array[index]
         sharp(array[index].path)
                .resize({
                   
                    width:1000,
                    
                    kernel: sharp.kernel.nearest,
                   // fit: 'fill',
                   // position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 }
                  }
                )
                .toBuffer(function (err, buf) {
                  if (err) return next(err)
                  const image =  buf.toString('base64');
                  fs.writeFile(array[index].path , image, {encoding: 'base64'},  function(err){
                      console.log(err);
                  });
                 // This will replace your original image with compressed once.
                });
                //.jpeg({quality:50})
               // .png({quality:50})
              //  .toFile(path.resolve(array[index].destination, 'uploads', image))
               // fs.unlinkSync(array[index].path)
      
     y--
    }
     if(y === 0){
       return 
     }
   
}


module.exports = resize
