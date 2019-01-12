import React, {Component} from "react"
import { connect } from "react-redux";
import CommentItem from "../components/CommentItem"
import { fetchComments, deleteComment } from "../store/actions/comments";
import RepliesList from "../components/RepliesList"
import ReplyForm from "../components/ReplyForm"


class CommentsList extends Component{
  state = { replyData: {}}
  componentDidMount(){
    const imageId = this.props.match.params.imageId
    this.props.fetchComments(imageId)
  }
  
  newReply = (replyData) => {
    this.setState({replyData})
  }

  render(){
    if(!Array.isArray(this.props.comments)){
      return <div>Loading</div>
    }
    
    let comments = this.props.comments.map(comment => (
        <div key = {comment._id} style={{paddingBottom: "20px"}}>
          <CommentItem
            date = {comment.createdAt} 
            username = {comment.author.username} 
            text = {comment.text}
            isCorrectUser = {this.props.currentUser.id === comment.author.id}
            deleteComment = {this.props.deleteComment.bind(this, comment._id, this.props.currentUser.id)} 
            css = "comment"
            />
          {this.props.currentUser.id && (
            <ReplyForm newReply={this.newReply} commentId={comment._id}/>
          )}
          <RepliesList newReply={this.state.replyData} parentId={comment._id}/>
        </div>
    ))
    return(
      <div className="pb-4">
        {comments}
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
