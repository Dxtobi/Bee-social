import React from 'react'


import PropTypes from 'prop-types';
import {  getCurrentProfile  } from '../../actions/profileActions'
import { connect } from 'react-redux';


class  SettingsEdit extends React.Component {
   
    state ={
     new_pass:'',
        old_pass: '',
     show:false,
    }

    
     componentDidMount(){
         this.props.getCurrentProfile()
     }
     
    
    onChange=( e )=>{
        this.setState( { [e.target.name]: e.target.value } );
    }
    
    handleShowPass=( e )=>{
        this.setState( { show:!this.state.show } );
    }
    onSubmit=( e )=>{
        const { new_pass, old_pass } = this.state
        if ((new_pass === '' || old_pass === '')||(new_pass ===  old_pass )||(new_pass.length < 8 ||  old_pass < 8)) {
            return
        }
        const passData = {
            newPass:new_pass,
            oldPass:old_pass,
        }
        console.log(passData)
    }
        render()
        {
          // console.log(this.state)
        return (
           <div className='setting-page'>
               <div className='setting-wraper'>
                 <section className='setting-top'>Change password</section>
                    <h5>Enter new password</h5>
                    <input
                        type={this.state.show?'text':'password'}
                        className='form-text-input'
                        placeholder='enter new password'
                        name='new_pass'
                        value={ this.state.newPass }
                        onChange={ this.onChange }
                    />

                    <h5>Old password</h5>
                    <input
                        type={this.state.show?'text':'password'}
                        className='form-text-input'
                        placeholder='enter old password'
                        name='old_pass'
                        value={ this.state.oldPass }
                        onChange={ this.onChange }
                    />

                    <button type="submit" onClick={this.onSubmit} className="btn-submit">
                        Change password
                </button>
                <button style={{marginTop:20}} type="submit" onClick={this.handleShowPass} className="btn-submit">
                   {this.state.show?'Hide password': 'Show password'}
                </button>
               </div>
           </div>
        );
    }
}
SettingsEdit.propTypes = {
    
     getCurrentProfile: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired
   }
   const mapStateToProps = ( state ) => ({
      auth: state.auth,
      profile:state.profile.profile
    });
   export default connect( mapStateToProps, {getCurrentProfile})(SettingsEdit);
//export default Settings;