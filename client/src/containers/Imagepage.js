import React, {Component} from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { fetchImage, deleteImage, marked } from "../store/actions/images";
import { Link } from "react-router-dom";
import CommentForm from "../components/CommentForm"
import CommentsList from "../components/CommentsList"
import {Loading, Spinner} from "../components/Loading"

//Image page
class ImagePage extends Component{
  constructor(props){
    super(props)
    this.state={clickedRed: false, clickedDelete: false, showMore: false}
  }
  
  componentDidMount(){
    let image_id = this.props.match.params.imageId 
    this.props.fetchImage(image_id)
      .then(res => {
        if(res===false){
          this.props.history.push("/")
        } else if(this.props.image.text.length < 500){
          this.setState({showMore: true})
        }
      })
  }
  
  handleDelete = e =>{
    if(this.state.clickedDelete === false){
      e.preventDefault()
      this.setState({clickedDelete: true})
      let image_id = e.target.value
      let user_id = this.props.currentUser.id
      this.props.deleteImage(image_id, user_id)
        .then(()=>this.props.history.push("/"))
        .catch(()=>this.setState({clickedDelete:false}))
    }
  }
  
  handleMark = () =>{
    if(this.state.clickedRed === false){
      this.setState({clickedRed: true});
      let image_id = this.props.match.params.imageId
      let user_id = this.props.currentUser.id
      this.props.marked(image_id, user_id)
        .then(()=>this.setState({clickedRed: false}))
      
        // .catch(()=>this.setState({clickedRed: false}))
    }
  }
  
  showMore = () => {
    this.setState({showMore: !this.state.showMore})
  }
  
  render(){
    const {image, currentUser} = this.props
    if(!image.author){
      return <Loading/>
    }
    return(
      <div className="row imagepage">
        <div className="col-md-8 offset-md-2 image-page">
          <div>
            <div className="card">   
            <img src={image.image} className="h-100 w-100 card-img-top" alt={image.title}/>
            <div className="card-body">
              <div className="float-right">
                <div className="d-flex flex-row" style={{marginTop: "-15px"}}>
                  <h1>{image.red}</h1>
                  <span style={{fontSize: "13px", color:"#e8233b"}}>Red</span>
                </div>
              </div>
              <h5 className="card-title">{image.title}</h5>
              <p className="text text-muted" style={{marginTop: "-10px", fontSize: "13px"}}>by {image.author.username} | <span><Moment fromNow>{image.createdAt}</Moment></span> | {image.updatedAt && <span>edited | </span>}<span>{image.views || 0} views</span></p>
              <p style={{maxHeight: this.state.showMore ? "none" : "100px"}} className="description card-text text-justify" dangerouslySetInnerHTML={{ __html: image.text}}/>
              {image.text.length > 500 && 
                <div className="text-muted pt-2"
                  style={{fontSize: "12px", cursor:"pointer"}}
                  onClick={this.showMore}>SHOW {this.state.showMore === false ? "MORE" : "LESS"}
                </div>
              }
            </div>
            <div className="authaction d-flex justify-content-between">
              {image.author && image.author._id === currentUser.id && (
                <div className="btn-group">
                  <Link className="btn btn-outline-dark" to={`/images/${image._id}/edit`}>Edit</Link>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-dark mr-2" 
                      value={image._id}
                      name={image.author._id}
                      onClick={this.handleDelete}>Delete
                    </button>
                    {this.state.clickedDelete === true && (
                      <Spinner />
                    )}
                  </div>
                </div>
                )}
                <div>
                </div>
                {currentUser.id && (
                <div style={{display: "flex", alignItems:"center"}}>
                  {this.state.clickedRed === true && (
                    <Spinner/>
                  )}
                  <button 
                    className="btn btn-outline-danger marked" 
                    style={image.level.includes(currentUser.id) ? {background:"#e8233b", color:"white"} : {}} 
                    onClick={this.handleMark}>{image.level.includes(currentUser.id) ? `Red Marked` :  `Mark This Red`}
                  </button>
                </div>
                )}
              </div>
          </div>
            <div className="allcomments">
              <h4>Comments</h4>
              <hr/>
              {currentUser.id ? (<CommentForm {...this.props}/>) : (<h5 className="text-center">Login to add comment</h5>)}
              <CommentsList {...this.props}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        image: state.images,
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { fetchImage, deleteImage, marked })(ImagePage)

