import React, { Component } from "react";
import { Form, Text } from 'informed';
import {Spinner} from "../components/Loading"
import { connect } from "react-redux";

class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      clicked: false
    }
  }
  
  componentDidMount(){
    if(this.props.currentUser.isAuthenticated){
      this.props.history.push("/")
    }
  }
  
  handleSubmit = () => {
      this.setState({clicked: true})
      const authType = this.props.signup ? "signup" : "signin";
      this.props.onAuth(authType, this.state)
        .then(()=>{
          this.props.history.push("/")})
        .catch(()=>{
          this.setState({clicked: false})
        })
  };

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  
  render(){
    const {signup, removeError, errors} = this.props
    this.props.history.listen(() => {
            removeError();
        })
    
    const basicValidation = value => {
      return !value || value.length < 5 ? 'Password must be at least five characters' : null;
    }
    
    const matchValidation = ( value, values ) => {
      return values.password !== values.confirmPassword ? 'Passwords must match' : null;
    }
    
    const passwordValidation = ( value, values ) => {
      return basicValidation(value) || matchValidation( value, values )
    }
    
    const emailValidation = value => {
      if(!value || value.length < 5){
        return 'Email must be valid'
      } else if(!value.includes("@"||".") || value.includes(" ")){
        return "Email must be valid" 
      }  
    }
    
    return(
        <div className="col-md-4 offset-4" style={{margin:"80px auto"}}>
          <Form className="authform" onSubmit={this.handleSubmit}>
            {({ formState }) => (
            <div>
            {this.state.clicked === true && (
            <div style={{position: "absolute", right:"40px"}}><Spinner/></div>
            )}
            <h2>{signup ? "Welcome" : "Welcome Back" }</h2>
            {errors.message && <div className="alert alert-danger text-center">{errors.message}</div>}
            <p className="float-right" style={{fontSize:"0.8rem", color:"red"}}>{formState.errors.email}</p>
            <label htmlFor="email">Email:</label>
            <Text
                field="email"
                className="form-control"
                id="email"
                name="email"
                validate={emailValidation}
                validateOnBlur
                onChange={this.handleChange}
                value={this.state.email}
            />
            {signup && (
              <div>
                <label htmlFor="username">Username:</label>
                <Text
                  field="username"
                  name="username"
                  className="form-control"
                  id="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
              </div>    
              )}
            <p className="float-right" style={{fontSize:"0.8rem", color:"red"}}>{formState.errors.password}</p>
            <label htmlFor="password">Password:</label>
            <Text
              field="password"
              className="form-control"
              id="notify-password"
              validate={signup ? passwordValidation : null}
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              validateOnBlur
              notify={signup ? ['confirmPassword']: null}/>
            {signup && (
            <div>
              <p className="float-right" style={{fontSize:"0.8rem", color:"red"}}>{formState.errors.confirmPassword}</p>
              <label htmlFor="notify-confirm-password">Confirm password:</label>
              <Text
                field="confirmPassword"
                className="form-control"
                id="notify-confirm-password"
                validate={passwordValidation}
                validateOnChange
                type="password"
                notify={['password']}/>
            </div>
            )}
            <button type="submit" className="btn btn-dark">Submit</button>
            </div>
            )}
          </Form>
        </div>
      )
  }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(AuthForm);
