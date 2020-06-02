import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postsActions';
import { IoMdSend  } from 'react-icons/io';

class CommentForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      errors:{},
      showcomment:false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors){
      this.setState({errors: newProps.errors});
    }
  }
  addEmoji = (emoji)=>{
      //const {text} = this.state
  }
  toggleEmojiPiker = ()=>{
    this.setState({showemojis: !this.state.showemojis})
  }
  onSubmit(e) {
    e.preventDefault();

    
    const {postId} = this.props;
    if(this.state.text === '')return;
    const newComment = {
      text: this.state.text,
    };

    this.props.addComment(postId, newComment);
    this.setState({text: ''});
    //window.location.reload()
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onbluecom=(e)=>{
    const name = e.target.getAttribute('name')
    this.setState({[name]: e.target.value.trim().replace(/(\r\n|\n|\r)/gm, "")});
  }
  render() {
    const { postedby} = this.props;
   // const {errors} = this.state;

    return (
      <div className="comment-box-container">
        <div className="comment-input">
        
          <div className="">
            
            <form onSubmit={this.onSubmit}>
              
                <div className="message-box">
                    <div className="spacer"/>
                    <div className="spacer"/>
                    <textarea type="text"
                     placeholder={`Reply to post from @${postedby}`}
                     name="text"
                     value={this.state.text}
                     onChange={this.onChange}
                     onBlur={this.onbluecom}
                     className="message-input"></textarea>
                    <div className="spacer"/>
                    <button type="submit"  onClick={this.onSubmit} className="message-submit"><IoMdSend className='icons-xx'/></button>
                    <div className="spacer"/>
               </div>
              
             
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {addComment})(CommentForm);
