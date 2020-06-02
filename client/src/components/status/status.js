import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import TextFieldGroup from '../common/TextFieldGroup';
//import {IoIosSend} from 'react-icons/io';
import {addStatus} from '../../actions/status';
import SimpleReactValidator from 'simple-react-validator';
import './status.css';
//import { Link } from 'react-router-dom';

let formobj = new FormData()
class Status extends Component {

  constructor(props){
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
        text: '',
        errors:{},
        postImage: '',
        tags : [],
        Tags:'',
        posted : false,

    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }
  
  componentDidMount(){
    this.clearFORMDATA()
    this.setState({exp : Date.now})
  }
 
componentWillReceiveProps(newProps) {
    if(newProps.errors){
      this.setState({errors: newProps.errors});
    }
    console.log('-----', newProps)
    //this.setState({tags : newProps.tags})
  }
clearFORMDATA= ()=>{
    
    formobj.delete('text')
    formobj.delete('imgs')
    
   // console.log(formobj)
  }
  onChange( e ){
    this.setState( { [e.target.name]: e.target.value } );
    //console.log(this.state.text)
  }
  onSubmit(e) {
    
    
     e.preventDefault();
     
     
     formobj.append('text', this.state.text);
     formobj.append('expiration', this.state.exp);
   
     this.props.addStatus(formobj)
    
    }
  onChangeImg(e){
        for (let index = 0; index <  e.target.files.length; index++) {
            formobj.append('imgs', e.target.files[index]);
        }
       // this.setState({
       //   postImage : URL.createObjectURL(e.target.files[0])
       // })
        //this.setState({[e.target.name]: e.target.value});
       // console.log(formobj);
      }
  render() {

   // const {errors} = this.props;

    return (
      <div className="post-form">
 
            <form onSubmit={this.onSubmit} encType='multipart/form-data'>
        
             <div className='midle'>
                <textarea
                      
                      placeholder="Type . . ."
                      name="text"
                      value={ this.state.text }
                      onChange={ this.onChange }
                      className='status-text'
                 />
                 
                 <input className='status-submit' onChange = {this.onChangeImg} type='file' name = 'imgs'/>
             </div> 
             <button  className='status-submit' type='submit'>Post</button>
               
            </form>
           
      </div>
    );
  }
}

Status.propTypes = {
  addStatus: PropTypes.func.isRequired,
  //tags : PropTypes.array.isRequired
  
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addStatus})(Status);
