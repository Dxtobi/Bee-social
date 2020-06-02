import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


let formobj = new FormData();
let defimg = '/assets/images/pixocam.png';
class CreateProfile extends Component {

  constructor( props ) {
      super( props );
      this.state = {
          displaySocialInputs: false,
          handle: '',
          company: '',
          website: '',
          location: '',
          postImage: defimg,
          status: '',
          skills: '',
          githubusername: '',
          bio: '',
          twitter: '',
          facebook: '',
          linkedin: '',
          youtube: '',
          instagram: '',
          errors: { }
      };

      this.onChange = this.onChange.bind( this );
      this.onSubmit = this.onSubmit.bind( this );
      this.onChangeImg = this.onChangeImg.bind(this);
  }

  componentWillReceiveProps( nextProps ){
    if(nextProps.errors){
     this.setState({errors: nextProps.errors});
    }
  }
  onChangeImg(e){
    formobj.append('profileImage' ,  'pip-'+ Date.now());
    formobj.append('profileImageData', e.target.files[0])
   
    this.setState({
      postImage : URL.createObjectURL(e.target.files[0])
    })
    //this.setState({[e.target.name]: e.target.value});
    console.log(formobj);
  }
  onChange( e ){
    this.setState( { [e.target.name]: e.target.value } );
  }

  onSubmit( e ){

    e.preventDefault();

   /* const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }*/
    const {user} = this.props.auth;
      formobj.append('id' , user.id)
      formobj.append( 'handle', this.state.handle);
      formobj.append( 'company', this.state.company);
      formobj.append( 'website', this.state.website);
      formobj.append( 'location', this.state.location);
      formobj.append( 'status', this.state.status);
      formobj.append( 'skills', this.state.skills);
      formobj.append( 'bio', this.state.bio);
      formobj.append( 'twitter', this.state.twitter);
      formobj.append( 'facebook', this.state.facebook);
      formobj.append( 'linkedin', this.state.linkedin);
      formobj.append( 'instagram', this.state.instagram);
      formobj.append( 'youtube', this.state.youtube);
    
      this.props.createProfile( formobj, this.props.history );
    
    
  }

  render() {

    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if( displaySocialInputs ){
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={ this.state.twitter }
            onChange={ this.onChange }
            error={ errors.twitter }
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={ this.state.facebook }
            onChange={ this.onChange }
            error={ errors.facebook }
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={ this.state.linkedin }
            onChange={ this.onChange }
            error={ errors.linkedin }
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={ this.state.youtube }
            onChange={ this.onChange }
            error={ errors.youtube }
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={ this.state.instagram }
            onChange={ this.onChange }
            error={ errors.instagram }
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: 'Your Profesion', value: 0 },
      { label: 'Working class', value: 'Working class' },
      { label: 'Enterprenuer', value: 'Enterprenuer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Other', value: 'Other' }
    ];

      return (
        <div className="create-profile">
          <div className="wrapper">
            <div className="">
              <div className="">
                <h2 className="center-text">Create your profile </h2>
                <form onSubmit={ this.onSubmit }  encType='multipart/form-data'>

                <div className='profile-image-upload'>
                  <div className=''>
                    <label className="">
                    
                    <input type="file" className="file-input"  name='profileImageData'
                      onChange={(e)=>this.onChangeImg(e, 'multer')}/>
                      <div className='profile-preview-img'>
                        <img src={this.state.postImage} alt='.'/>
                      </div>
                    </label>
                  </div>
                  
                </div>
               

                  <TextFieldGroup
                    placeholder="  Profile Handle"
                    name="handle"
                    value={ this.state.handle }
                    onChange={ this.onChange }
                    error={ errors.handle }
                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                  />
                  <SelectListGroup
                    placeholder=" Status"
                    name="status"
                    value={ this.state.status }
                    onChange={ this.onChange }
                    options={ options }
                    error={ errors.status }
                    info="Give us an idea of here you are at in your career"
                  />
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={ this.state.company }
                    onChange={ this.onChange }
                    error={ errors.company }
                    info="Could be your own company or one you work for"
                  />
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={ this.state.website }
                    onChange={ this.onChange }
                    error={ errors.website }
                    info="Could be your own website or a company one"
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={ this.state.location }
                    onChange={ this.onChange }
                    error={ errors.location }
                    info="City or city & state suggested (eg. Boston, MA)"
                  />
                  <TextFieldGroup
                    placeholder="Skills"
                    name="skills"
                    value={ this.state.skills }
                    onChange={ this.onChange }
                    error={ errors.skills }
                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  />
                  <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={ this.state.bio }
                    onChange={ this.onChange }
                    error={ errors.bio }
                    info="Tell us a little about yourself"
                  />
                  <div className="">
                    <button
                      type="button"
                      onClick={() => {
                      this.setState( prevState => ({
                        displaySocialInputs : !prevState.displaySocialInputs
                      }))
                    }} className="btn-normal"> Social Network Links (Optional)</button>

                   
                  </div>
                  { socialInputs }
                  <input type="submit" value="Submit" className="btn-submit"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  }
}


CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect( mapStateToProps, { createProfile } )( withRouter( CreateProfile ) );
