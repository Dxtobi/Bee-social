import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import countries from './countries'
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import isEmpty from '../../validation/is-empty';
import { Avatar } from '@material-ui/core';



let formobj = new FormData();
let defimg = '/assets/images/pixocam.png';





class CreateProfile extends Component {

  constructor( props ) {
      super( props );
      this.state = {
        handle:'',
        website: '',
        country: '',
        bio: '',
        state: '',
        email: '',
        mobile:234,
        userImageData: '',
         
          errors: { }
      };

      this.onChange = this.onChange.bind( this );
      this.onSubmit = this.onSubmit.bind( this );
      this.onChangeImg = this.onChangeImg.bind(this);
       
  }

  componentDidMount(){
    this.props.getCurrentProfile();
    this.clearFORMDATA()
    
  }

  componentWillReceiveProps( nextProps ){
    if(nextProps.errors){
     this.setState({errors: nextProps.errors});
    }

    if(nextProps.profile.profile){
      const profile = nextProps.profile.profile;

      // Bring skills array back to Comma Separated Value
      
      
     
     
      // Set component fields state
      this.setState({
        handle: profile.handle === "undefined" ? '' : profile.handle,
        website: profile.website === "undefined" ? '' : profile.website,
        country: profile.country === "undefined" ? '' : profile.country,
        bio: profile.bio === "undefined" ? '' : profile.bio,
        state: profile.state === "undefined" ? '' : profile.state,
        mobile: profile.phone === "undefined" ? '' : profile.phone,
        email: profile.email === "undefined" ? '' : profile.email,
        userImageData: profile.userImageData === "undefined" ? '' : profile.userImageData
      });
      console.log(profile)
    }
  }
  setdefimg(e){
    if (e === 'multer') {
      this.setState({
        userImageData : defimg
      })
    }
  }
  onChange( e ){
    this.setState( { [e.target.name]: e.target.value } );
  }
  onChangeImg(e){
    formobj.append('userImage' ,  'pip-'+ Date.now());
    formobj.append('userImageData' , e.target.files[0]);
   
    this.setState({
      userImageData : URL.createObjectURL(e.target.files[0])
    })
    //this.setState({[e.target.name]: e.target.value});
    console.log(formobj);
  }
  onSubmit( e ){

    e.preventDefault();
      formobj.append('handle' , this.state.handle);
      formobj.append('website' , this.state.website);
      formobj.append('country', this.state.country);
      formobj.append('bio', this.state.bio);
      formobj.append('state', this.state.state);
     // formobj.append('state', this.state.state);
      formobj.append('mobile', this.state.mobile);
      
   
    console.log('====================================');
    console.log(formobj);
    console.log('====================================');
    this.props.createProfile( formobj, this.props.history );
  }
clearFORMDATA= ()=>{
    formobj.delete('handle')
    formobj.delete('website')
    formobj.delete('country')
    formobj.delete('state')
    formobj.delete('bio');
    formobj.delete('mobile')
    formobj.delete('userImage')
    formobj.delete('userImageData')
    console.log(formobj)
  }

  render() {
    
    const { errors,  } = this.state;
   
 
    // Select options for status

      return (
        <div className="create-profile">
          <div className="container">
            <div className="">
              <div className="">
                <button onClick={e=>this.props.history.goBack()} className="btn-normal">Go Back</button>
            
                <form onSubmit={ this.onSubmit } encType='multipart/form-data'>

                <div className='profile-image-upload'>
                  <div className=''>
                    <label className="">
                    
                    <input type="file" className="file-input"  name='userImageData'
                      onChange={(e)=>this.onChangeImg(e, 'multer')}/>
                      <div className=''>
                      <Avatar style={{width: 80,  height: 80}} variant =  'circle' src={this.state.userImageData} alt={this.props.profile.name}   />
                        
                      </div>
                    </label>
                  </div>
                  
                </div>
                <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    placeholder=" * Profile Handle"
                    name="handle"
                    value={ this.state.handle }
                    onChange={ this.onChange }
                    error={ errors.handle }
                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={ this.state.website }
                    onChange={ this.onChange }
                    error={ errors.website }
                    info="Could be your own website or a company one"
                  />
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.onChange }
                    error={ errors.email }
                    disabled={true}
                    info="Could be your own website or a company one"
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    placeholder="Country"
                    name="country"
                    value={ this.state.country }
                    onChange={ this.onChange }
                    error={ errors.country }
                    info="Could be your own website or a company one"
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    placeholder="State"
                    name="state"
                    value={ this.state.state }
                    onChange={ this.onChange }
                    error={ errors.state }
                    info="Could be your own website or a company one"
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    placeholder="Mobile"
                    name="mobile"
                    type='number'
                    value={ this.state.mobile }
                    onChange={ this.onChange }
                    error={ errors.website }
                    info="mobile"
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={ this.state.bio }
                    onChange={ this.onChange }
                    error={ errors.bio }
                    info="Tell us a little about yourself"
                  />
                 
                  
                  <input type="submit" value="Update" className="btn-submit"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  }
}


CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect( mapStateToProps, { createProfile, getCurrentProfile } )( withRouter( CreateProfile ) );
