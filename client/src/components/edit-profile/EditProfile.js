import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { clearErrors} from '../../actions/postsActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Model from '../common/model';
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

  componentWillMount(){
    this.props.getCurrentProfile();
    this.clearFORMDATA()
    this.props.clearErrors()
  }

  componentWillReceiveProps( nextProps ){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
    console.log(nextProps.isError)
    if(nextProps.profile.profile && !nextProps.profile.loading){
       const profile = nextProps.profile.profile;
       // Bring skills array back to Comma Separated Value
      
       //Set component fields state
      this.setState({
        handle: profile.handle !== undefined&& profile.handle,
        website:profile.handle !== undefined&& profile.website,
        country:profile.country !== undefined && profile.country,
        bio:profile.bio !== undefined&& profile.bio,
        state:profile.state !== undefined && profile.state,
        mobile:profile.phone !== undefined && profile.phone,
        email:profile.email !== undefined && profile.email,
        userImageData:profile.userImageData !== undefined && profile.userImageData
      });
      
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
  //  console.log(formobj)
  this.props.clearErrors()
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
                  <input
                    placeholder="Email"
                    name="email"
                    className='form-text-input'
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
                    type='phone'
                    value={ this.state.mobile.toString() }
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
              {
                this.props.isError && (
                  <Model message='error: file or bad field entry' cancelAction={this.props.clearErrors }/>
                )
              }
            </div>
          </div>
        </div>
      )
  }
}




const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors.errors,
  isError:state.errors.isError
});

export default connect( mapStateToProps, { createProfile, getCurrentProfile, clearErrors } )( CreateProfile ) ;
