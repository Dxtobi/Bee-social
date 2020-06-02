import React from 'react';
import Spinner from '../common/Spinner';


export default class FullImage extends React.Component{

    state={
        url : ''
    }

    componentDidMount() {
        this.setState({url:this.props.match.params.img})
       // this.setState({url:this.props.img})
    }

    handleGoBack=()=>{
        this.props.history.goBack()
    }

    render(){
        const {url} =this.state
        console.log(url)
        return(
           <div>
                   { 
                   
                   url === '' ? 

                         <Spinner/>

                   :

                    <div  className='displayfull'>

                        <img src={`/uploads/${url}`} alt ='' />

                    </div>

                    }
           </div>
        )
    }
    
}
