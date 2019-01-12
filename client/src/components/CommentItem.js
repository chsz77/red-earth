import React, {Component} from "react";
import Moment from "react-moment";
import {Spinner} from "../components/Loading"

class CommentItem extends Component {
    state = {deleteClicked:false }
    
    clickedDelete = () => {
        this.setState({deleteClicked: true})
        this.props.deleteComment()
            .then(res => {
                
                if(this.props.css==="replies"){
                this.setState({deleteClicked: false})
                this.props.deleteReply(res)}
            })
            
    }
    
    render(){
        let {date, username, text, isCorrectUser, css} = this.props
        
        return (
            <div className={css}>
                <div className="d-flex justify-content-between">
                    <p style={{borderBottom: "solid 0.5px"}}className="author">{username}
                          {` | `}<span className="date">
                         <Moment fromNow>{date}</Moment>
                        </span>
                    </p>
                    {isCorrectUser && (
                        <div className="d-flex">
                            {this.state.deleteClicked && <Spinner/>}
                            <button className="btn btn-outline-danger delete" onClick={this.clickedDelete}>&times;</button>
                        </div>
                    )}
                </div>
                <p className="text-justify comment-description" dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        )

    }   
}

export default CommentItem