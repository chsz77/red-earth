import React, {Component} from "react"
import axios from "axios"
import {API} from "../store/actionTypes"
import { deleteImage, marked } from "../store/actions/images";
import { deleteComment } from "../store/actions/comments";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {Loading, Spinner} from "../components/Loading"

class Dashboard extends Component {
    state = {images:[], comments:[], level:[], deleteClicked:{images: false, comments:false, level: false}, loading: true,}
    
    componentDidMount(){
        if(this.props.currentUser.id){
            let user_id = this.props.currentUser.id
            axios.get(`${API}/api/dashboard/${user_id}`)
                .then(res => {
                    let images = res.data.images
                    let comments = res.data.comments
                    let level = res.data.level
                    this.setState({images, comments, level, loading: false})
                })
        } else {
            this.props.history.push("/")
        }
        
    }
    
    deleteComment = (value, value2) => {
        this.setState({deleteClicked: {comments: true}})
        this.props.deleteComment(value, value2, "reply")
            .then(res => {
                this.setState({comments: this.state.comments.filter(comment => comment._id !== res), deleteClicked: {comments: false}})
            })
    }
    
    deleteImage = (value, value2) => {
        this.setState({deleteClicked: {images: true}})
        this.props.deleteImage(value, value2)
            .then(res => {
                this.setState({
                    images:this.state.images.filter(image => image._id !== res), 
                    comments: this.state.comments.filter(comment => comment.imageId._id !== res),
                    deleteClicked: {images: false}})
            })
        
    }
    
    unMarkedRed = (imageId, userId) => {
        this.setState({deleteClicked: {level: true}})
        this.props.marked(imageId, userId)
            .then(()=> this.setState({level:this.state.level.filter(image => image._id !== imageId), deleteClicked: {level: false}})
            )
    }
    
    render(){
        if(this.state.loading === true){
          return <Loading />
        }
        
        return(
            <div className="container dashboard">
                <div className="py-4 table-responsive">
                {this.state.deleteClicked.images && (
                <Spinner />
                )}
                <h5 className="py-4 text-center">Your Posts</h5>
                {this.state.images.length < 1 ? <div className="text-center">You have nothing</div> : 
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Created At</th>
                            <th>Views</th>
                            <th>Red</th>
                            <th>Action</th>
                        </tr>
                        {this.state.images.map((image, i) => (
                        <tr key = {image._id}>
                            <td>{i+1 + "."}</td>
                            <td><Link to={`/images/${image._id}`}>{image.title}</Link></td>
                            <td>{image.text.replace(/<(.|\n)*?>/g, '')}</td>
                            <td>{image.location}</td>
                            <td><Moment format="LL">{image.createdAt}</Moment></td>
                            <td className="text-center">{image.views}</td>
                            <td className="text-center">{image.red}</td>
                            <td><Link to={`/images/${image._id}/edit`}>Edit</Link><button onClick={this.deleteImage.bind(this, image._id, this.props.currentUser.id)} style={{cursor:"pointer"}}>Delete</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                }
                </div>
                <div className="py-4 table-responsive">
                {this.state.deleteClicked.level && (
                <Spinner />
                )}
                <h5 className="py-4 text-center">Your Red</h5>
                {this.state.level.length < 1 ? <div className="text-center">You have nothing</div> : 
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th className="text-center">Image Views</th>
                            <th className="text-center">Image Red</th>
                            <th className="text-center">Action</th>
                        </tr>
                        {this.state.level.map((image, i) => (
                        <tr key = {image._id}>
                            <td>{i+1 + "."}</td>
                            <td><Link to={`/images/${image._id}`}>{image.title}</Link></td>
                            <td>{image.location.split(", ")[0]}</td>
                            <td className="text-center">{image.views}</td>
                            <td className="text-center">{image.red}</td>
                            <td className="text-center"><button onClick={this.unMarkedRed.bind(this, image._id, this.props.currentUser.id)} style={{cursor:"pointer"}}>Unmarked</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                }
                </div>
                <div className="py-4 table-responsive">
                    {this.state.deleteClicked.comments && (
                    <Spinner />
                    )}
                    <h5 className="py-4 text-center">Your Comments</h5>
                    {this.state.comments.length < 1 ? <div className="text-center">You have nothing</div> : 
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Text</th>
                                <th>Image Parent</th>
                                <th>Created At</th>
                                <th className="text-center">Agree</th>
                                <th className="text-center">Hate</th>
                                <th className="text-center">Points</th>
                                <th>Action</th>
                            </tr>
                            {this.state.comments.map((comment, i) => (
                            <tr key={comment._id}>
                                <td>{i+1 + "."}</td>
                                <td>{comment.text.replace(/<(.|\n)*?>/g, '')}</td>
                                <td><Link to={`/images/${comment.imageId ? comment.imageId._id : comment.parentId ? (comment.parentId.imageId ? comment.parentId.imageId._id : "") : "-"}`}>{comment.imageId ? comment.imageId.title : comment.parentId ? (comment.parentId.imageId ? comment.parentId.imageId.title : "") : "-"}</Link></td>
                                <td><Moment format="LL">{comment.createdAt}</Moment></td>
                                <td className="text-center">{comment.helpful.length}</td>
                                <td className="text-center">{comment.nothelpful.length}</td>
                                <td className="text-center">{comment.points}</td>
                                <td><button onClick={this.deleteComment.bind(this, comment._id, this.props.currentUser.id)} style={{cursor:"pointer"}}>Delete</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    }
                </div>    
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
  };
}

export default connect(mapStateToProps, {deleteImage, deleteComment, marked})(Dashboard)