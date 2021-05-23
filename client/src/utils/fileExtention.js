

export function getExtention(filename) {
    let o = filename.slice((filename.lastIndexOf('.')-1>>>0)+2)
    //let x = filename.split('.').pop()
   // console.log(x, o)
    return o
}

export function getImgUrl(url) {
    //let o = url.slice((url.lastIndexOf(`uploads`)-1>>>0)+2)
    let x = url.split('uploads').pop()
    console.log(x )
    return x
}