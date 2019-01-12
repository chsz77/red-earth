import React, {Component} from "react"
import queryString from 'query-string'
import {Link} from "react-router-dom"
import { connect } from "react-redux"

class Searchbar extends Component{
  state={location:"", style: "homepage", suggestionButton: false}
  
  componentDidMount(){
    let location = queryString.parse(this.props.location.search).location
    if(location && location.length>0){
    this.setState({location})}
  }
  
  componentDidUpdate(prevProps){
    if(this.props.images !== prevProps.images){
      this.setState({suggestionButton: true})
    }
  }
  
  
  handleSubmit = e => {
      e.preventDefault();
      let query = queryString.parse(this.props.location.search)
      query.location = this.state.location
      this.props.history.push("?"+queryString.stringify(query, {sort: false}))
  }
  
  suggestionButton = () => {
    let button = []
    if(this.props.images.length > 1 && this.state.location===""){
      for (let i = 0; i < 5; i++) {
        let location = this.props.images[Math.floor(Math.random()*this.props.images.length)].location
        let suggestionButton = <span
          onClick={this.handleClick}
          className="suggestion"
          key={i}>{location.split(" ").length > 2 && location.length > 25 ? (location.slice(0, 20) + '...') : location}</span>
        button.push(suggestionButton)
      }
    }
    return button
  }
  
  handleClick = e => {
    e.persist()
    this.setState({location: e.target.innerHTML}, () => {this.handleSubmit(e); this.hideText()})
  }
  
  hideText = () => {
    if(!this.state.style.includes("homepage-2")){
    this.setState({style: "homepage homepage-2"})}
  }
  
  render(){
    return (
      <div className={this.state.style}>
        <div className="main-section text-center">
        <div className="text">
          <h2>We give you the most polluted places in the World</h2>
          <p>because you keep polluting it, <span style={{fontWeight:"bold"}}>yet </span> know nothing</p>
        </div>
        <form style={{maxWidth: "700px"}} onSubmit={this.handleSubmit} className="searchbar mx-auto">
          <input
            className="form-control"
            placeholder="New York, Jakarta, Berlin, Tokyo..."
            style={{borderRadius: "18px", textAlign: "center"}}
            onChange={ e =>this.setState({location: e.target.value})} 
            value={this.state.location} type="text"/>
            {this.state.suggestionButton && (<div className="mt-3">{this.suggestionButton()}</div>)}
          <button
            onClick={this.hideText}
            style={{padding: "10px 50px"}}
            className="btn btn-dark mx-1 mt-3" type="submit">Search</button>
          {!this.props.currentUser.isAuthenticated && (
            <Link
              style={{padding: "10px 50px"}}
              className="btn btn-dark mx-1 mt-3" to="/signup">Join Us
            </Link>
          )}
        </form>
        </div>
      </div>
    )
  }  
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        images: state.images
    };
}

export default connect(mapStateToProps)(Searchbar);
