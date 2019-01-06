import React, {Component} from "react"
import { connect } from "react-redux";
import {Spinner} from "../components/Loading"
import Moment from "react-moment";
import { fetchComments, deleteComment } from "../store/actions/comments";


class CommentsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      clicked: false
    }
  }
  
  
  componentDidMount(){
    const imageId = this.props.match.params.imageId
    this.props.fetchComments(imageId)
  }
  
  handleDeleteComment = e =>{
    if(this.state.clicked === false){
      this.setState({clicked: true})
      let comment_id = e.target.value
      let user_id = this.props.currentUser.id
      this.props.deleteComment(comment_id, user_id)
        .then(()=> this.setState({
          clicked: false
        }))
    }
  }
  
  render(){
    if(!Array.isArray(this.props.comments)){
      return <div>Loading</div>
    }
    
    return(
      <div>
      {this.state.clicked === true && 
      <div style={{position: "absolute", right: "30px", marginTop: "-20px"}}>
        <Spinner />
      </div>}
      {this.props.comments.map(comment => (
        <div key={comment._id} className="comment">
          <div className="d-flex justify-content-between my-2">
            <p style={{borderBottom: "solid 0.5px"}}className="author">{comment.author.username} 
            <span className="date">
               {` | `} <Moment fromNow>{comment.createdAt}</Moment>
            </span>
            </p>
            {this.props.currentUser.id === comment.author.id && (
            <button value={comment._id} onClick={this.handleDeleteComment}>x</button>
            )}
          </div>
          
          <p className="text-justify" dangerouslySetInnerHTML={{ __html: comment.text }}/>
        </div>
      ))}
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
