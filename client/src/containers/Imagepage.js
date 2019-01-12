import React, {Component} from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { fetchImage, deleteImage, marked } from "../store/actions/images";
import { Link } from "react-router-dom";
import CommentForm from "../components/CommentForm"
import CommentsList from "../components/CommentsList"
import {Loading, Spinner} from "../components/Loading"
import GoogleMaps from "../components/GoogleMaps"

//Image page
class ImagePage extends Component{
  constructor(props){
    super(props)
    this.state={clickedRed: false, clickedDelete: false, showMore: false, loading: true, tab: "image"}
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
      .then(()=>this.setState({loading:false}))
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
    }
  }
  
  handleShowMore = () => {
    this.setState({showMore: !this.state.showMore})
  }
  
  switchTab = e => {
    this.setState({tab: e.target.innerHTML.toLowerCase()})
  }
  
  render(){
    const {image, currentUser} = this.props
    if(this.state.loading){
      return <Loading/>
    }
    return(
      <div className="imagepage">
        <div className="col-md-8 mx-auto image-page">
          {image.lat && (
          <div className="switch-tab">
            <button style={this.state.tab==="image" ? {color: "#e8233b", borderBottomColor: "#e8233b"} : {}} onClick={this.switchTab}>
              Image
            </button>
            <button style={this.state.tab==="location" ? {color: "#e8233b", borderBottomColor: "#e8233b"} : {}} onClick={this.switchTab}>
              Location
            </button>
          </div>
          )}
          <div>
            <div className="card">   
            <img src={image.image} className={`${this.state.tab==="image" ? "d-block" : "d-none"} h-100 w-100 card-img-top`} alt={image.title}/>
            {image.lat && (
            <GoogleMaps lng={image.lng} lat={image.lat} display={this.state.tab}/>
            )}
            <div className="card-body">
              <div className="float-right">
                <div className="d-flex flex-row" style={{marginTop: "-15px"}}>
                  <h1>{image.red}</h1>
                  <span style={{fontSize: "13px", color:"#e8233b"}}>Red</span>
                </div>
              </div>
              <h5 className="card-title">{image.title}</h5>
              <p style={{fontSize: "14px"}}className="text-muted">{image.location}</p>
              <p className="text text-muted" style={{marginTop: "-10px", fontSize: "13px"}}>by {image.author ? image.author.username : ""} | <span><Moment fromNow>{image.createdAt}</Moment></span> | <span>{image.views || 0} views</span></p>
              <p className={`${this.state.showMore ? "showMore" : ""} description card-text text-justify`} dangerouslySetInnerHTML={{ __html: image.text}}/>
              {image.text.length > 500 && 
                <div className="text-muted pt-2"
                  style={{fontSize: "12px", cursor:"pointer"}}
                  onClick={this.handleShowMore}>SHOW {this.state.showMore === false ? "MORE" : "LESS"}
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
            <div className="allcomments col-md-11 mx-auto">
              <h4>Comments</h4>
              <hr/>
              {currentUser.id ? (<CommentForm {...this.props}/>) : (<h5 className="text-center py-4">Login to add comment</h5>)}
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
        image: state.image,
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { fetchImage, deleteImage, marked })(ImagePage)

