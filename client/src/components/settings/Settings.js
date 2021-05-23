import React from 'react'
import { Link } from 'react-router-dom'
//import { MdGroupAdd,MdShuffle, Md3DRotation } from 'react-icons/md'
import  {FiUser,} from 'react-icons/fi'
//import ToggleTheme from "../../utils/ToggleTheme";
import './setting.css'
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import {  getCurrentProfile  } from '../../actions/profileActions'
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core'
import {  GiSlashedShield } from 'react-icons/gi';
import { MdGroupAdd } from 'react-icons/md';

class  Settings extends React.Component {
   
    state ={
     name:'',
     email:'',
     handle:'',
     phone:'',
     posts:0,
     image:'',
     following:[],
     followers:[]
    }

    componentWillReceiveProps(newProps){
      if(newProps.profile){
         console.log(newProps.profile)
         this.setState({
            name:newProps.profile.firstname + ' ' + newProps.profile.secondname,
            email:newProps.profile.email,
            handle:newProps.profile.handle,
            phone:newProps.profile.phone,
            following:newProps.profile.following,
            followers:newProps.profile.followers,
            posts:newProps.profile.posts,
            image:newProps.profile.userImageData
         })
      }
    }
     componentDidMount(){
         this.props.getCurrentProfile()
     }
     
     handlelogout=()=>{
      this.props.logoutUser() ; 
     }
     toggle =()=>{
       //ToggleTheme()
     //  this.props.toggleTheme()
     }
        render()
        {
           console.log(this.state)
        return (
           <div className='setting-page'>
               <div className='setting-wraper'>
                 <section className='setting-top'>Settings</section>
                 <section>
                  <Link to='/edit-profile'>
                     <div className='setting-box'>
                        <h4>Profiles</h4>
                          <div className='setting-box-content'>
                             <div>
                                <Avatar src={`/${this.state.image}`} alt='' />
                                <div>
                                <div className='setting-box-text'>{this.state.handle}</div>
                                 <div className='setting-box-text'>{this.state.email}</div>
                                </div>
                             </div>
                             <div style={{ marginLeft: 20 }}>
                                Edit
                              </div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section >
                  <Link to='/new ads'>
                     <div className='setting-box'>
                        <div className='setting-box-content'>
                           <div className='setting-box-text'> Create Ads</div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section>
                  <Link to='/security'>
                     <div className='setting-box'>
                        <div className='setting-box-content'>
                           <div className='setting-box-text'><GiSlashedShield style={{marginLeft: 10}} />Security</div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section>
                  <div>
                     <div className='setting-box'>
                        <div className='setting-box-content'>
                          <Link style={{color:'white'}}className='setting-box-text' to='/group/create' ><MdGroupAdd FiUser style={{marginLeft: 10}} /> Create Group </Link>
                        </div>
                     </div>
                  </div>
                 </section>
                 <section>
                  <div onClick={this.handlelogout}>
                     <div className='setting-box'>
                        <div className='setting-box-content'>
                           <div className='setting-box-text'><FiUser style={{marginLeft: 10}} />Log out</div>
                        </div>
                     </div>
                  </div>
                 </section>
                
                
               </div>
           </div>
        );
    }
}
Settings.propTypes = {
     logoutUser: PropTypes.func.isRequired,
     getCurrentProfile: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired
   }
   const mapStateToProps = ( state ) => ({
      auth: state.auth,
      profile:state.profile.profile
    });
   export default connect( mapStateToProps, {getCurrentProfile, logoutUser})(Settings);
//export default Settings;