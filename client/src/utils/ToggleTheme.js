
import { lightTheme, darkTheme, blackTheme } from '../theme';
const toggleTheme = () => {
    // if the theme is not light, then set it to dark
   // console.log('clicked')
    let e = window.localStorage.getItem('theme')
    console.log(e)
    let  toggleprops= {
        theme:lightTheme,
        themetogle:1
    }
    if (e === '1') {
      toggleprops.theme=darkTheme
      toggleprops.themetogle=2
      window.localStorage.setItem('theme',2)
     // console.log(toggleprops)
      return  toggleprops
    // otherwise, it should be light
    } else if (e === '2'){
        toggleprops.theme=blackTheme
        toggleprops.themetogle=3
        window.localStorage.setItem('theme',3)
       // console.log(toggleprops)
        return  toggleprops
    } else{
        toggleprops.theme=lightTheme
        toggleprops.themetogle=1
        window.localStorage.setItem('theme',1)
      //  console.log(toggleprops)
        return  toggleprops
    }
  }

export default toggleTheme;
