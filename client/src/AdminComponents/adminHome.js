import React from 'react'
import Sidebar from './sidebar'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class AdminHome extends React.Component {
    state = { 
        component : 1,
        lastcomponent :5
     }

     changeComponent = (e) =>{
        
             console.log(e)
             this.setState({component : e })
        
     }
    render() {
        const {component} = this.state
        return (
            <div className='admin_wrapper'>
               <Sidebar changeComp={this.changeComponent}/>
               <div className='Contents_App a-view'>{component}</div>
            </div>
        );
    }
}

export default AdminHome;