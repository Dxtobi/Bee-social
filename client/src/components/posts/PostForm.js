import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Model from '../common/model';
import {IoIosSend} from 'react-icons/io';
import {addPost, getTags, setTypingTrue, clearErrors} from '../../actions/postsActions';
import SimpleReactValidator from 'simple-react-validator';
import { Avatar, } from '@material-ui/core';
import MP from '../Messages/MediaPreviw';
//import { Link } from 'react-router-dom';


let formobj = new FormData()
let searchResultarray
class PostForm extends Component {

  constructor(props){
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
        text: '',
        errors:{},
        postImage: [],
        tags : [],
        Tags:'',
        posted : false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
  }
  
  componentDidMount() {
    this.props.clearErrors()
   // this.props.getTags();
    this.handleFocus()
    this.clearFORMDATA()
    //console.log(formobj)
  }
  componentWillReceiveProps(newProps) {
  //  console.log(newProps)
    if(newProps.post.sent){
      this.clearFORMDATA()
    }
    if(newProps.errors){
      this.setState({errors: newProps.errors});
    }
    //this.props.history.push('/feed')
    if(newProps.post.sent && !newProps.error){
      this.props.history.push('/feed')
    }

  //  console.log(newProps)
    //this.setState({tags : newProps.tags})
  }
  onSubmit(e) {
    e.preventDefault();
     if (this.state.text === '' && (this.state.postImage === '/assets/images/pixocam.png' || this.state.postImage === null||this.state.postImage=== undefined|| this.state.postImage=== '')){
      return 
     }else{
      if (this.state.text.length<301)
        {
          formobj.append('text', this.state.text)
        formobj.append('tags' , this.state.Tags)
        this.props.addPost(formobj)
        this.setState({
          text: '',
          errors:{},
          profileID : '',
          Tags:''
        })
      }else{
        return
      }
       // this.validator.showMessages();
        // rerender to show messages for the first time
        // you can use the autoForceUpdate option to do this automatically`
       // this.forceUpdate();
    
     
     }
    
    this.setState({text: '', Tags : []});
    //console.log('====================================');
    //console.log(formobj);
    //console.log('====================================');
    
    }
  clearFORMDATA= ()=>{
    
    formobj.delete('text')
    formobj.delete('name')
    formobj.delete('tags')
    formobj.delete('profil_id')
    formobj.delete('postImage');
    formobj.delete('postImageData')
    this.props.clearErrors()
   // console.log(formobj)
  }
  onChange( e ){
    this.setState( { [e.target.name]: e.target.value } );
    //console.log(this.state.text)
  }
  onChangeTag =( e )=>{
   
    this.setState( { [e.target.name]: e.target.value.trim()  } );
    if(e.target.value.length !== ''){
      this.setState({
        tags : searchResultarray
      })
    }else{
      this.setState({
        tags :[]
      })
    }
   
    //console.log(this.state.text)
  }
  searchResults = (data)=>{
    
  }
  onChangeImg(e){
    let imgs = []
    for (let index = 0; index <  e.target.files.length; index++) {
      formobj.append('postImageData', e.target.files[index]);
      imgs.push( URL.createObjectURL(e.target.files[index]))
    }
    if(imgs.length > 0){
      this.setState({
        postImage : imgs
      })
    }
  
  
    //this.setState({[e.target.name]: e.target.value});
  // console.log(formobj);
  }
  handleFocus = () =>{
    //console.log('focosing....')
    this.props.setTypingTrue()
  }
  render() {
   // console.log(this.state.postImage)
    const {errors} = this.props;

    return (
      <div className="post-form">
        <div className="">
          <div className='user_post'>
            <div className='postAvatar'><Avatar variant ='circle' className='post-Avatar'  src={this.props.auth.user.avatar} alt=''/></div>
          </div>
          {errors.isError && (
            <Model message='file might be too large or Network errors' cancelAction={ this.props.clearErrors} />
            )}
          <div className="">
            <form onSubmit={this.onSubmit} encType='multipart/form-data'>
              <div className="">
                <TextAreaFieldGroup
                  placeholder="Create a post...."
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  onFocus={this.handleFocus}
                  error={errors.text}
                />
                 {/**********   This is where the magic happens     ***********/}
              <small>{this.state.text.length> 300?0:300 - this.state.text.length}</small>
              </div>
             
              <div  className="post-input-buttons">
               <label className="">
                <input type="file" className="file-input"  name='postImageData'
                  onChange={(e)=>this.onChangeImg(e, 'multer')} multiple/>
                   <div className='post-preview-img'>
                    <Avatar variant ='rounded'  src={this.state.postImage[0]} alt=''/>
                   </div>
               </label>
               < button type="submit"  className={`btn-submit ${this.state.text.length>300 || this.state.text.length===300?'disabled':null}`} ><IoIosSend className='icons-xx'/></ button>
             </div>
            </form>
            <MP images={this.state.postImage}/>
           
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  //tags : PropTypes.array.isRequired
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
  tags : state.post.tags,
  post:state.post
});

export default connect(mapStateToProps, {addPost , setTypingTrue, getTags, clearErrors})(PostForm);
