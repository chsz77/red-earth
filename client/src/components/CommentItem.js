import React, {Component} from "react";
import Moment from "react-moment";
import {Spinner} from "../components/Loading"

class CommentItem extends Component {
    state = {loading:false }
    
    clickedDelete = () => {
        this.setState({loading: true})
        this.props.deleteComment()
            .then(res => {
                if(this.props.css==="replies"){
                this.setState({loading: false})
                this.props.deleteReply(res)}
            })
            
    }
    
    agree = () => {
        if(!this.props.nothelpful.includes(this.props.user_id)){
            this.setState({loading: true})
            this.props.votes()
                .then(() => this.setState({loading: false}))
        }    
    }
    
    hate = () => {
        if(!this.props.helpful.includes(this.props.user_id)){
        this.setState({loading: true})
        this.props.hates()
            .then(() => this.setState({loading: false}))
        }    
    }
    
    render(){
        let {date, username, text, isCorrectUser, css, points, helpful, nothelpful, user_id} = this.props
        
        return (
            <div className={css}>
                <div className="d-flex justify-content-between">
                    <p style={{borderBottom: "solid 0.5px"}}className="author">{username}
                          {` | `}
                        <span className="date">
                         <Moment fromNow>{date}</Moment> 
                        </span>
                    </p>
                    <div className="d-flex">
                        {this.state.loading && <Spinner/>}
                        {css==="comment" && (
                        <div className="comment-vote">
                            {user_id && (
                            <span>
                            <button 
                                onClick={this.agree} 
                                className={`${nothelpful.includes(user_id) ? "disabled" : ""} ${helpful.includes(user_id) ? "voted" : ""} btn btn-sm btn-outline-dark`}>
                                Agree
                            </button>
                            <button 
                                onClick={this.hate} 
                                className={`${helpful.includes(user_id) ? "disabled" : ""} ${nothelpful.includes(user_id) ? "voted" : ""} btn btn-sm btn-outline-dark`}>
                                Hate
                            </button>
                            </span>
                            )}
                            <button className="points btn btn-sm">
                             <span className="point-text">{points > 0 ? "Helpful" : points === 0 ? "No Vote" : "Hated" }</span><span className="point-count">{points} points</span>
                            </button>
                        </div>)}
                    {isCorrectUser && ( 
                        <button className="btn btn-outline-danger delete" onClick={this.clickedDelete}>&times;</button>
                    )}
                    </div>
                </div>
                <p className="text-justify comment-description" dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        )

    }   
}

export default CommentItem