import React, {Component} from "react"
import CommentItem from "../components/CommentItem"
import { deleteComment } from "../store/actions/comments";
import axios from "axios";
import { connect } from "react-redux";
import {API} from "../store/actionTypes";


class Replies extends Component{
  state = {replies: []}
  
  componentDidMount(){
      axios.get(`${API}/api/comments/replies/${this.props.parentId}`)
        .then(res => {
          let replies = res.data
          this.setState({replies})
        })
        .catch(err => console.log(err))
  }
  
  componentDidUpdate(prevProps){
    if(this.props.newReply !== prevProps.newReply && this.props.newReply.parentId === this.props.parentId){
      let newReply = this.props.newReply
      this.setState({replies:[newReply, ...this.state.replies] })
    }
  }
  
  deleteReply = (replyId) => {
    this.setState({replies: this.state.replies.filter(replies => replies._id !== replyId)},)
  }
  
  render(){
    if(!Array.isArray(this.state.replies)){
      return <div>Loading</div>
    }
    
    let replies = this.state.replies.map((reply, i) => (
        <CommentItem 
          key = {i}
          date = {reply.createdAt}
          text = {reply.text}
          username = {reply.author.username}
          deleteComment = {this.props.deleteComment.bind(this, reply._id, this.props.currentUser.id, "reply")}
          deleteReply = {this.deleteReply}
          isCorrectUser = {this.props.currentUser.id === reply.author.id}
          css="replies"  
        />
    ))
    return(
      <div>
        {replies}
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { deleteComment })(Replies)
