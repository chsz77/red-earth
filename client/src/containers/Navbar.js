import React, {Component} from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth"

class Navbar extends Component {
  logout = e => {
    this.props.logout()
  }
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">earth. <span style={{color: "#e8233b"}}>red.</span> project</Link>
          <ul className="navbar-nav ml-auto d-flex flex-row">
          {this.props.currentUser.isAuthenticated ? (
            <div className="d-flex flex-row">
              <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link className="btn btn-dark mx-2" to="/images/new">Submit New Image</Link></li>
              <li className="nav-item"><Link onClick={this.logout} to="/" className="nav-link">Logout</Link></li>
            </div>
          ) : <li><Link className="btn btn-outline-dark" to="/signin">Login</Link></li>}
          </ul>
      </nav>
    )
  }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, {logout})(Navbar);