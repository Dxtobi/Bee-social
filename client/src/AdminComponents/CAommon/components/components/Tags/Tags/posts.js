import React, { Component } from 'react';
import Post from "./posts/post";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReportedPost, deletePost , aprovedPost as  approveAdsPost} from "../../../../../../actions/postsActions";
//import TextFieldGroup from "../../../../../../components/common/TextFieldGroup";
//import { Popper } from '@material-ui/core';
//import SimpleReactValidator from 'simple-react-validator';

class Posts extends Component {
    state = { 
        all_post:[]
     }

     componentDidMount(){

         this.props.getReportedPost()

     }

     componentWillReceiveProps(nextProps) {
         //console.log(nextProps.posts)
         if(nextProps.posts.length > 0){ 
             this.setState({
                     all_post : nextProps.posts
                })
        }
     }

     deletepost=(e)=>{
         this.props.deletePost(e)
     }
     aproveAds=(id)=>{
        this.props.approveAdsPost(id)
     }
     
    render() {
        return (
            <div>
                <Post aprovePostAds={this.aproveAds} posts={this.state.all_post}/>
            </div>
        );
    }
}
Posts.propTypes = {
    getReportedPost: PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
    approveAdsPost:PropTypes.func.isRequired,
  }
  
const mapStateToProps = state => ({
    posts: state.post.posts
  })

export default connect(mapStateToProps, {deletePost, approveAdsPost, getReportedPost})(Posts);