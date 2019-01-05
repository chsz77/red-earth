import React from "react";
import Moment from "react-moment";

const CommentItem = ({date, text, author, deleteComment, isCorrectUser}) => (
    <div>
        <div className="comment">
          <div className="d-flex justify-content-between my-2">
            <p style={{borderBottom: "solid 0.5px"}}className="author">@{author} 
            <span className="date">
               {` | `} <Moment fromNow>{date}</Moment>
            </span>
            </p>
            {isCorrectUser && (
            <button onClick={deleteComment}>x</button>
          )}
          </div>
          <p className="text text-justify">{text}</p>
        </div>
    </div>    
) 

export default CommentItem