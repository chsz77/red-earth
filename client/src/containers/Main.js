import React from "react";
import { Switch, Route, withRouter, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import Mainpage from "../containers/Mainpage";
import AuthForm from "../containers/AuthForm";
import ImageForm from "../containers/ImageForm";
import Imagepage from "../containers/Imagepage"
import { authUser } from "../store/actions/auth"
import { removeError } from "../store/actions/errors"

//Main Routes
const Main = props => {
  const { authUser, errors, removeError } = props;
  return(
    <Switch>
      <Route exact path='/' render={() => (<Redirect to="/images"/>)}/>
      <Route exact path='/images' render={props => <Mainpage/>}/>
      <Route exact path='/signin' component={props => <AuthForm onAuth={authUser} errors={errors} removeError={removeError} {...props} />}/>
      <Route exact path='/signup' component={props => <AuthForm signup onAuth={authUser} errors={errors} removeError={removeError} {...props}/>}/>
      <Route exact path='/images/new' component={props=> <ImageForm {...props}/>}/>
      <Route exact path='/images/:imageId/edit'  component={props=> <ImageForm edit {...props}/>}/>        
      <Route exact path='/images/:imageId'  component={props=> <Imagepage {...props}/>}/>        
    </Switch>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
