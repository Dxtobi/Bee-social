import React from 'react'
//import { MdCancel } from 'react-icons/md'
import PostItem from '../../../../../../../components/posts/PostItem'


export default (props) => {
    console.log(props)
    return(
        <div className='a-post-container'>
          {
                props.posts.map( post => <PostItem approvePost={props.aprovePostAds} key={post._id} post={post}/>)
           }
        </div>
    )
}
