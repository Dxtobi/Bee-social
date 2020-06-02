import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGroup,  } from '../../actions/groupActions';
import TextFieldGroup from "../common/TextFieldGroup";
import {Avatar} from '@material-ui/core'




let formobj = new FormData();
//let defimg = '/assets/images/pixocam.png';





class CreateGroup extends Component {

  constructor( props ) {
      super( props );
      this.state = {
        gname:'',
        gwebsite: '',
        ginfo: '',
        gicon: '',
         
          errors: { }
      };

      this.onChange = this.onChange.bind( this );
      this.onSubmit = this.onSubmit.bind( this );
      this.onChangeImg = this.onChangeImg.bind(this);
       
  }

  componentDidMount(){
    
    this.clearFORMDATA()
    
  }

 
 
  onChange( e ){
    this.setState( { [e.target.name]: e.target.value } );
  }
  onChangeImg(e){
   // formobj.append('userImage' ,  'pip-'+ Date.now());
    formobj.append('gicon' , e.target.files[0]);
   
    this.setState({
      gicon : URL.createObjectURL(e.target.files[0])
    })
    //this.setState({[e.target.name]: e.target.value});
    console.log(formobj);
  }
  onSubmit( e ){

    e.preventDefault();
      formobj.append('gname' , this.state.gname);
      formobj.append('gwebsite' , this.state.gwebsite);
      formobj.append('ginfo', this.state.ginfo);
     
    console.log('====================================');
    console.log(formobj);
    console.log('====================================');
    this.props.createGroup( formobj, this.props.history );
  }
clearFORMDATA= ()=>{
    formobj.delete('gicon')
    formobj.delete('gwebsite')
    formobj.delete('ginfo')
    formobj.delete('gname')
   
    console.log(formobj)
  }

  render() {
    
  // const { errors,  } = this.state;
   
 
    // Select options for status

      return (
        <div className="create-profile">
          <div className="container">
            <div className="">
              <div className="">
                <Link to="/dashboard" className="btn-normal">Go Back</Link>
            
                <form onSubmit={ this.onSubmit } encType='multipart/form-data'>

                <div className='profile-image-upload'>
                <div style={{marginBottom: 1+'rem'}}/>
                    <label className="">
                    
                    <input type="file" className="file-input"  name='gicon'
                      onChange={(e)=>this.onChangeImg(e, 'multer')}/>
                      <div className='profile-preview-img'>
                           <Avatar style={{width: 100+'px', height: 100+'px'}} src={this.state.gicon} alt='img'/>
                      </div>
                    </label>
                  </div>
                  
                
                <div style={{marginBottom: 1+'rem'}}/>
                 
                  <TextFieldGroup
                    colorPrimary
                    required
                    placeholder=" Group Name "
                    name="gname"
                    value={ this.state.gname }
                    onChange={ this.onChange }
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    placeholder=" Group Website "
                    name="gwebsite"
                    value={ this.state.gwebsite }
                    onChange={ this.onChange }
                  />
                  <div style={{marginBottom: 1+'rem'}}/>
                  <TextFieldGroup
                    required
                    placeholder=" Group Info "
                    name="ginfo"
                    value={ this.state.ginfo }
                    onChange={ this.onChange }
                  />
                   <div style={{marginBottom: 1+'rem'}}/>

                  <button type="submit" value="creat group" className="btn-submit">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  }
}


CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth,
  errors: state.errors
});


export default connect( mapStateToProps, { createGroup} )( withRouter( CreateGroup ) );
