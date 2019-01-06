import React, {Component} from "react"
import {connect} from "react-redux"
import { newComment } from "../store/actions/comments"
import {Spinner} from "./Loading"
import TextEditor from "./TextEditor"

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            clicked: false
        }
    }
    
    handleNewComment = e => {
        e.preventDefault()
        if(this.state.clicked === false && this.state.text){
          this.setState({
            text: this.state.text.toString("html"),
            clicked: true, 
            imageId: this.props.match.params.imageId, 
            author:{
                  id: this.props.currentUser.id, 
                  username: this.props.currentUser.username
            }
          }, 
            () => {
              if(this.state.text.replace(/&nbsp;|<(.|\n)*?>/g, '').length>0){
                let userId = this.props.currentUser.id 
                this.props.newComment(this.state, userId)
                    .then(()=>this.setState({text:"", clicked: false}))
                    .catch(()=>this.setState({clicked: false}))
              } else {
                this.setState({clicked: false})
              } 
            }
          
          )
        }  
    }
    
    stateUp = (value) => {
      this.setState({text: value})
    }
    
    render(){
        return(
            <form className="newcommentform"
              onSubmit={this.handleNewComment}>
              <label htmlFor="input-comment" >
                Add Comment
              </label>
              <TextEditor size="commentform" stateUp={this.stateUp.bind(this)} clicked={this.state.clicked} text={this.state.text}/>
              <div className="d-flex justify-content-end align-items-center submit-button">
                {this.state.clicked===true && (
                <Spinner />
                )}
                <button
                  className="btn btn-dark  ml-2">
                  Submit
                </button>
              </div>
            </form>
        )
    }
} 

function mapStateToProps(state){
        return {
            errors: state.errors,
            currentUser: state.currentUser.user
        }
    }

export default connect(mapStateToProps, { newComment })(CommentForm)