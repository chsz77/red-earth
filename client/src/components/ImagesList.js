import React, {Component} from "react"
import { connect } from "react-redux";
import { fetchImages } from "../store/actions/images";
import {Link} from "react-router-dom"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {Loading} from "../components/Loading"
import Waypoint from 'react-waypoint';
import Moment from "react-moment";
 
class ImagesList extends Component {
  constructor(props){
    super(props)
    this.state = {
      limit: 20,
      skip: 0,
      end: false,
      sort: "newest",
      loading: true
    }
  }
  
  
  componentDidMount(){
    let sortBy = "newest"
    if(document.cookie.includes("sort")){
      // eslint-disable-next-line
      sortBy = document.cookie.replace(/(?:(?:^|.*;\s*)sort\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    }
    this.setState({sort: sortBy}, ()=>{ 
      this.props.fetchImages(this.state.limit, this.state.skip, this.state.sort)
        .then(()=>{
          this.setState({loading: false, skip: this.state.limit})
        })  
    }) 
  }
  
  loadMoreImages = () => {
      let skip = this.state.skip+this.state.limit 
      let limit = this.state.limit
      let sort = this.state.sort
      this.props.fetchImages(limit, skip, sort)
        .then((res) => {
          if(res===false){
            this.setState({end:true})
          }
          this.setState({skip})
        })
  }
  
  sortImageByRed = e => {
    let sortByRed = e.target.value
    this.setState({loading: true})
    this.props.fetchImages(this.state.limit, 0, sortByRed)
      .then(()=> {
          document.cookie = "sort=red"
          this.setState({skip: 0, sort: "red", loading: false, end:false})})
  }
  
  sortImageByViews = e => {
    let sortByViews = e.target.value
    this.setState({loading: true})
    this.props.fetchImages(this.state.limit, 0, sortByViews)
      .then(()=> {
        document.cookie = "sort=views"
        this.setState({skip: 0, sort: "views", loading: false, end:false})
      })
  }
  
  sortImageByNewest = () => {
    this.setState({loading: true})
    this.props.fetchImages(this.state.limit, 0)
      .then(() =>{ 
        document.cookie = "sort=newest"
        this.setState(
          this.setState({
            skip: 0, 
            loading: false, 
            sort: "newest",
            end: false
          }))
      })
  }
  
  render() {
    return (
        <div className="hero">
          <div className="sortbutton d-flex justify-content-center">
            <button 
              className="btn btn-outline-dark"
              onClick={this.sortImageByViews}
              style={{borderBottom: `${this.state.sort==="views" ? "solid" : ""}`}}
              value="views">
              VIEWS
            </button>
            <button 
              className="btn btn-outline-danger"
              onClick={this.sortImageByRed}
              style={{borderBottom: `${this.state.sort==="red" ? "solid" : ""}`}}
              value="red">
              REDDEST
            </button>
            <button 
              className="btn btn-outline-dark" 
              style={{borderBottom: `${this.state.sort==="newest" ? "solid" : ""}`}}
              onClick={this.sortImageByNewest}>
              NEW
            </button>
          </div>
          {Array.isArray(this.props.images) && this.props.images.length !== 0 && this.state.loading === false ? (
          <div>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry>
                {this.props.images.map((image, i) => (
                  <div key={i} className="card imageslist" style={{border: "none"}}>
                    <Link to={`/images/${image._id}`} style={{minHeight: "150px"}}>
                      <img alt={image.title} src={image.image}/>
                    </Link>
                    <div className="image-description d-flex justify-content-between">
                      <div>
                        <div>{image.title.split(" ").length > 2 && image.title.length > 25 ? (image.title.slice(0, 20) + '...') : image.title}</div> 
                        <p style={{fontSize: "13px"}}>
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
          
          {this.state.end===false ? 
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