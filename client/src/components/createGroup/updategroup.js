import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroup, updateGroup } from '../../actions/groupActions';
import TextFieldGroup from "../common/TextFieldGroup";
import {Avatar} from '@material-ui/core'




let formobj = new FormData();
//let defimg = '/assets/images/pixocam.png';





class UpdateGroup extends Component {

  constructor( props ) {
      super( props );
      this.state = {
        gname:'',
        gwebsite: '',
        ginfo: '',
        gicon: '',
         
          errors: { }
      };

       
  }

  componentDidMount(){
    
    this.props.getGroup(this.props.match.params.id);
    
  }

 componentWillReceiveProps(nextProps) {
     if(nextProps.group.name){
       const {name, info, website, groupImage}= nextProps.group
       this.setState({gname:name, gwebsite:website === undefined || website === "undefined"  ? '':website, ginfo:info, gicon:groupImage})
     }
 }
 
  onChange=( e )=>{
    this.setState( { [e.target.name]: e.target.value } );
  }


  onChangeImg=(e)=>{
   // formobj.append('userImage' ,  'pip-'+ Date.now());
    formobj.append('gicon' , e.target.files[0]);
   
    this.setState({
      gicon : URL.createObjectURL(e.target.files[0])
    })
    //this.setState({[e.target.name]: e.target.value});
    //console.log(formobj);
  }


  onSubmit=( e )=>{

    e.preventDefault();
      formobj.append('gname' , this.state.gname);
      formobj.append('gwebsite' , this.state.gwebsite);
      formobj.append('ginfo', this.state.ginfo);
     
   
    this.props.updateGroup( this.props.match.params.id, formobj, this.props.history );
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
                <Link to={`/groupchat/${this.props.match.params.id}`}className="btn-normal">Go Back</Link>
                <form onSubmit={ this.onSubmit } encType='multipart/form-data'>

                <div className='profile-image-upload'>
                <div style={{marginBottom: 1+'rem'}}/>
                    <label className="">
                    
                    <input type="file" className="file-input"  name='gicon'
                      onChange={(e)=>this.onChangeImg(e, 'multer')}/>
                      <div className='profile-preview-img'>
                           <Avatar style={{width: 100+'px', height: 100+'px'}} src={`/${this.state.gicon}`} alt={this.state.gname}/>
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
                    error={this.props.errors.Name}
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
                    error={this.props.errors.Info}
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


UpdateGroup.propTypes = {
 // createGroup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getGroup:PropTypes.func.isRequired,
  updateGroup:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  group: state.groups.group,
  auth: state.auth,
  errors: state.errors
});


export default connect( mapStateToProps, { getGroup, updateGroup} )( withRouter( UpdateGroup ) );
