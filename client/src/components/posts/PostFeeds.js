import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import {Proprofiles} from '../profiles/proProfiles'
import RePostItem from './Repost';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

class PostFeeds extends Component {

  state={
    posts:[],
    profiles:[]
  }
  componentDidMount() {
      
    const { posts , profiles} = this.props;
   // console.log(this.props)
   /* let all = []
    let post = posts, hash =Object.create(null)
    post.forEach((u)=>{
      let key = JSON.stringify(u);
      hash[key] =(hash[key]||0)+1;
      if(hash[key]>=2){
        return null
      }else{
        return all.push(JSON.parse(key))
      }
    })*/
    this.setState({ posts : posts, profiles:profiles})
   // console.log(posts.length, '===mounted feed')

  }
  render() {

    const { posts , profiles} = this.state;
   // console.log(profiles)
    return (
      <div>
         <div className='proUsersbox'>
            <div>
             
                 <Link to={`/status`}><div className='addStatus' ><FiPlus /></div></Link>
           
        </div>
           {profiles.map( (user, i) => <Proprofiles key={i} user={user}/>)}
         </div>
         {posts.map( (post, i) => post.repost? <RePostItem key={i}  post={post}/> :<PostItem key={i} runRelode={true} post={post}/>)}
      </div>
      )

  }
}

PostFeeds.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeeds;
