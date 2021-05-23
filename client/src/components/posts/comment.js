import React, {Component} from 'react';
import { Link,  } from 'react-router-dom';


class Comment extends Component {

   truncateString = (str, num=30) => {
     //  console.log(str)
       if(str === undefined || str === 'undefined'){
           return
       }else if (str.length <= num) {
         return str
        }else{
        return str.slice(0, num) + '...'
       }
      }

  render() {
    const { comment} = this.props;
   // console.log(comment)
    if(comment.comment === null){
      return<div className="comments">last comment was deleted</div>
    }
    return (
      
        <Link to={`/post/${comment.comment.post}`}>
            <div className="comments">
                <div className="comments-h">{comment.comment.handle}</div>
                <div className="comments-t">{this.truncateString(comment.comment.text, 50)}</div>
            </div>
        </Link>
      
    );
  }
}



export default Comment
