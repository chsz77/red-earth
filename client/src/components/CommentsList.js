import React, {Component} from "react"
import { connect } from "react-redux";
import CommentItem from "../components/CommentItem"
import { fetchComments, deleteComment } from "../store/actions/comments";


class CommentsList extends Component{
  
  componentDidMount(){
    const imageId = this.props.match.params.imageId
    this.props.fetchComments(imageId)
  }
  
  render(){
    if(!Array.isArray(this.props.comments)){
      return <div>Loading</div>
    }
    
    let commentsList = this.props.comments.map(comment => (
        <CommentItem
            key={comment._id} 
            date={comment.createdAt} 
            text={comment.text}
            author={comment.author.username}
            deleteComment={this.props.deleteComment.bind(this, comment._id, this.props.currentUser.id)}
            isCorrectUser={this.props.currentUser.id === comment.author.id}
        />))
    
    return(
      <div>
          {commentsList}
      </div>  
    )
  }
}

function mapStateToProps(state){
    return {
        comments: state.comments,
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { fetchComments, deleteComment })(CommentsList)
