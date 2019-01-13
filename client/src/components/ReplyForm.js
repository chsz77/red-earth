import React, {Component} from "react"
import { connect } from "react-redux";
import TextEditor from "../components/TextEditor";
import {Spinner} from "./Loading";
import { newComment } from "../store/actions/comments"

class ReplyForm extends Component {
    state = {submitClicked: false, replyClicked: false, text: ""}
    
    stateUp = value => {
        this.setState({text: value})
    }
    
    clickedReply = () => {
      this.setState({replyClicked: !this.state.replyClicked})
    }
  
    handleReply = e => {
        e.preventDefault()
        if(this.state.submitClicked === false && this.state.text){
          this.setState({
            text: this.state.text.toString("html"),
            submitClicked: true, 
            reply: true, 
            parentId: this.props.commentId, 
            author:{
                  id: this.props.currentUser.id, 
                  username: this.props.currentUser.username
            }
          }, 
            () => {
              if(this.state.text.replace(/&nbsp;|<(.|\n)*?>/g, '').length>0){
                let userId = this.props.currentUser.id
                
                this.props.newComment(this.state, userId, "reply")
                    .then(res=>{
                        this.props.newReply(res); this.setState({text:"", submitClicked: false})})
                    .catch(()=>this.setState({submitClicked: false}))
              } else {
                this.setState({submitClicked: false})
              } 
            }
          
          )
        }  
    }
    render(){
        return (
            <div>
            <button onClick={this.clickedReply} className="reply">Reply</button>
            {this.state.replyClicked && (
                <form className="reply-input" onSubmit={this.handleReply}>
                <TextEditor stateUp={this.stateUp} text={this.state.text} clicked={this.state.submitClicked}/>
                <div className="d-flex align-items-center">
                    <button 
                        className="btn btn-sm" 
                        style={{color: "black", borderRadius: 0, marginTop:"3px" }} 
                        type="submit">
                        Submit
                    </button>
                    {this.state.submitClicked===true && (
                    <Spinner />
                    )}
                </div>
            </form>
            )}
            </div>
        
        )
    }
}



function mapStateToProps(state){
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { newComment })(ReplyForm)
