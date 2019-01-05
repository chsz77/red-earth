import React, {Component} from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

//Welcome
class Welcome extends Component {
  
  render(){
  if(this.props.currentUser.id){
    return null
  }
  return(
    <div className="homepage">
      <div className="main-section">
      <h1>We Know</h1>
        <div className="row">
          <div className="welcome col-md-6">
            <div>
              <h5><span>that</span> the real threat to life on Earth are Humans</h5>
              <h4><span>yet</span> We cannot stop devouring this Planet</h4>
              <h4><span>thus</span> We are doomed.</h4>
              <h5><span>because</span> Earth will punish us really badly for this.</h5>
            </div>
          </div>
          <div className="site-description col-md-6">
            <div className="dummy d-none d-md-block"></div>
            <h6>but We decide to do something.</h6>
            <h5>We share images of the most polluted places on Earth.</h5>
            <h6>so You can see it and decide what should you do too.</h6>
          </div>
          <div className="col-sm-12 text-center mt-3 auth">
          <div className="btn-group">
            <Link className="btn btn-outline-dark" to="/signin">Login</Link>
            <Link className="btn btn-dark" to="/signup">Join Us</Link>
          </div>
        </div>
      </div>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser.user
    };
}

export default connect(mapStateToProps)(Welcome);
