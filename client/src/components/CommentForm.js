import React, {Component} from "react"
import {connect} from "react-redux"
import { newComment } from "../store/actions/comments"
import {Spinner} from "./Loading"

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            newcomment: {},
            clicked: false
        }
    }
    
    handleNewComment = e => {
        if(this.state.clicked === false){
          this.setState({clicked: true})
          e.preventDefault()
          if(this.state.newcomment.text && this.state.newcomment.text.length > 0){
            let userId = this.props.currentUser.id 
            this.props.newComment(this.state.newcomment, userId)
                .then(()=>this.setState({newcomment:{text:""}, clicked: false}))
                .catch(()=>this.setState({newcomment:{text:""}, clicked: false}))
          }
        }  
    }
    
    onChange = e => this.setState(
        {
            newcomment: 
            {
                text: e.target.value,
                imageId: this.props.match.params.imageId, 
                author: 
                    {
                        id: this.props.currentUser.id, 
                        username: this.props.currentUser.username
                    }        
            }
        }
    )
    
    render(){
        return(
            <form className="newcommentform"
              onSubmit={this.handleNewComment}>
              <label htmlFor="input-comment" >
                Add Comment
              </label>
              <textarea
                className="form-control" 
                name="input-comment" 
                onChange={this.onChange}
                value={this.state.newcomment.text}
                rows="5"
              />
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