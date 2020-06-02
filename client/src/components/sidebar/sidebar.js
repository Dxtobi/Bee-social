import React from 'react'
//import { Link } from 'react-router-dom'
import { MdShuffle } from 'react-icons/md'
import  {FaUsers} from 'react-icons/fa'
import './side.css'
//import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class  Sidebar extends React.Component {
   
    state ={
      sidebarclass : 'side-bar',
      dropclass : 'sidebardroper'
    }

    componentWillReceiveProps(newProps){
      if(newProps.show){
         this.setState({
            sidebarclass : 'side-bar open',
            dropclass:'sidebardroper open'
            })
         
       }else{
         this.setState({
            sidebarclass : 'side-bar',
            dropclass:'sidebardroper'
            })
       }
    }
     componentDidMount(){
      if(this.props.show){
         this.setState({
            sidebarclass : 'side-bar open',
            dropclass:'sidebardroper open'
            })
       }
     }
        render()
        {
           
        return (
          <div className='side'>
               <div className={this.state.sidebarclass}>
               <div onClick={()=>this.props.toggle()} className='side-bar-container'>
                  <div><MdShuffle style={{marginRight: 2 +'rem'}} className='icons-xx' /> Toggle Theme </div>
               </div>
               
               </div>
               {this.props.show ? <div onClick={e=>this.props.sidebarToggle()} className={this.state.dropclass}/>:null}
               </div>
           
        );
    }
}
Sidebar.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired
   }
   const mapStateToProps = ( state ) => ({
      auth: state.auth
    });
   export default connect( mapStateToProps, )(Sidebar);
//export default Sidebar;