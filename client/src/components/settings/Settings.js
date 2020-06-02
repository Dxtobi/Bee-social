import React from 'react'
import { Link } from 'react-router-dom'
//import { MdGroupAdd,MdShuffle, Md3DRotation } from 'react-icons/md'
import  {FiUser, FiMail, FiAtSign} from 'react-icons/fi'
//import ToggleTheme from "../../utils/ToggleTheme";
import './setting.css'
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import {  getCurrentProfile  } from '../../actions/profileActions'
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core'
import { GiWallet, GiNestedHearts, GiSlashedShield } from 'react-icons/gi';
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
                              <Avatar src={`/${this.state.image}`} alt=''/>
                              <div style={{marginLeft: 20}}>
                                 <div className='setting-box-text'><FiUser style={{marginLeft: 10}} />{this.state.name}</div>
                                 <div className='setting-box-text'><FiAtSign style={{marginLeft: 10}} />{this.state.handle}</div>
                                 <div className='setting-box-text'><FiMail style={{marginLeft: 10}} />{this.state.email}</div>
                                 <div className='setting-footer'>
                                    <div className='setting-box-text'><div style={{marginLeft: 10}} >{this.state.followers ? this.state.followers.length:0}</div> Followers</div>
                                    <div className='spacer'/>
                                    <div className='setting-box-text'><div style={{marginLeft: 10}} >{this.state.following ? this.state.following.length:0}</div> Following</div>
                                    <div className='spacer'/>
                                    <div className='setting-box-text'><div style={{marginLeft: 10}} >{this.state.posts}</div> Posts</div>
                                 </div>
                              </div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section style={{display:'none'}}>
                  <Link to='/edit-profile'>
                     <div className='setting-box'>
                        <h4>Interested in</h4>
                        <div className='setting-box-content'>
                              <div style={{fontSize: 40}}><GiNestedHearts/></div>
                              <div style={{marginLeft: 20}}>
                                 <div className='setting-box-text'><FiUser style={{marginLeft: 10}} />John Mickel</div>
                                 <div className='setting-box-text'><FiAtSign style={{marginLeft: 10}} />Mickel</div>
                                 <div className='setting-box-text'><FiMail style={{marginLeft: 10}} />Johnmickel@gmail.com</div>
                              </div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section style={{display:'none'}}>
                  <Link to='/edit-profile'>
                     <div className='setting-box'>
                        <h4>Wallet</h4>
                        <div className='setting-box-content'>
                              <div style={{fontSize: 40}}><GiWallet/></div>
                              <div style={{marginLeft: 20}}>
                                 <div className='setting-box-text'><div style={{marginLeft: 10}}>Amount</div>N 10,000</div>
                              </div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section style={{display:'none'}}>
                  <Link to='//new ads'>
                     <div className='setting-box'>
                        <div className='setting-box-content'>
                           <div className='setting-box-text'><FiUser style={{marginLeft: 10}} />Ads</div>
                        </div>
                     </div>
                  </Link>
                 </section>
                 <section>
                  <Link to='/edit-profile'>
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