import React, {Component} from "react"
import { connect } from "react-redux";
import { fetchImages } from "../store/actions/images";
import {Link} from "react-router-dom"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {Loading, Spinner} from "../components/Loading"
import Waypoint from 'react-waypoint';
import Moment from "react-moment";
import queryString from 'query-string'
 
class ImagesList extends Component {
  constructor(props){
    super(props)
    this.state = {
      limit: 20,
      skip: 0,
      end: false,
      loading: false,
      spinner: false
    }
  }
  
  componentDidMount(){
    let {sortBy, location} = queryString.parse(this.props.location.search)
    this.props.fetchImages(this.state.limit, this.state.skip, sortBy, location)
  }
  
  componentDidUpdate(prevProps){
    let oldSort = queryString.parse(prevProps.location.search).sortBy
    let oldLocation = queryString.parse(prevProps.location.search).location
    let newLocation = queryString.parse(this.props.location.search).location
    let newSort = queryString.parse(this.props.location.search).sortBy
    if (newSort !== oldSort || newLocation !== oldLocation){
      this.update()
    }
  }
  
  loadMoreImages = () => {
      if(this.state.loading===false){
        let skip = this.state.skip+this.state.limit 
        let limit = this.state.limit
        let {sortBy, location} = queryString.parse(this.props.location.search)
        this.props.fetchImages(limit, skip, sortBy, location)
          .then((res) => {
            if(res===false){
              this.setState({end:true})
            }
            this.setState({skip})
          })
      }  
  }
  
  update = () => {
    this.setState({spinner: true})
    let {sortBy, location} = queryString.parse(this.props.location.search)
    this.props.fetchImages(this.state.limit, 0, sortBy, location)
      .then(()=> {
          this.setState({skip: 0, loading: false, end:false, spinner: false})})
  }
  
  handleSortQuery = e => {
    let query = queryString.parse(this.props.location.search)
    query.sortBy = e.target.value
    this.props.history.push("?" + queryString.stringify(query)) 
  }
  
  render() {
    const sortBy = queryString.parse(this.props.location.search).sortBy
    
    const sortButton = <div className="sortbutton d-flex justify-content-center align-items-center">
            {this.state.spinner && <Spinner />}
            <button 
              className="btn btn-outline-dark"
              value="views"
              onClick={this.handleSortQuery}
              style={{borderBottom: `${sortBy==="views" ? "solid" : ""}`}}>
              VIEWS
            </button>
            <button
              className="btn btn-outline-danger"
              value="red"
              onClick={this.handleSortQuery}
              style={{borderBottom: `${sortBy==="red" ? "solid" : ""}`}}>
              REDDEST
            </button>
            <button
              className="btn btn-outline-dark" 
              style={{borderBottom: `${!sortBy || sortBy==="newest" ? "solid" : ""}`}}
              value="newest"
              onClick={this.handleSortQuery}>
              NEW
            </button>
          </div>
    
    return (
        <div className="hero">
          {sortButton}
          {Array.isArray(this.props.images) && this.props.images.length !== 0 ? (
          <div>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry>
                {this.props.images.map((image, i) => (
                  <div key={image._id} className="card imageslist" style={{border: "none"}}>
                    <Link to={`/images/${image._id}`} style={{minHeight: "150px"}}>
                      <img alt={image.title} src={image.image}/>
                    </Link>
                    <div className="image-description d-flex justify-content-between">
                      <div>
                        <div>{image.title.split(" ").length > 2 && image.title.length > 25 ? (image.title.slice(0, 20) + '...') : image.title}</div> 
                        <p
                          style={{
                            fontSize: "13px", 
                            fontWeight: "bold", 
                            marginBottom: 0}}>
                          {image.location.split(" ").length > 2 && image.location.length > 25 ? (image.location.slice(0, 20) + '...') : image.location}
                        </p>
                        <p style={{fontSize: "12px"}}>
                          <Moment format="LL">{image.createdAt}</Moment> | <Moment fromNow>{image.createdAt}</Moment>
                        </p>
                      </div>
                      <div className="d-flex flex-column">
                      <div>{image.red} <span style={{color: "#e8233b"}}>Red</span></div>
                      <div>{image.views || 0} Views</div>
                      </div>
                    </div>
                  </div>
                ))}   
            </Masonry>
          </ResponsiveMasonry>
          
          { this.state.end===false  ? 
            (<div><Waypoint onEnter={this.loadMoreImages}/><Loading/></div>) : 
            (<p className="text-center text-muted mt-3">End of the World</p>)
          }
          </div>): <Loading/>}
        </div>
    )
  }
}

function mapStateToProps(state){
    return {
        images: state.images,
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, { fetchImages, })(ImagesList)