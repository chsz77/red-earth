import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import { newImage, fetchImage } from "../store/actions/images"
import { Form, Text } from 'informed';
import {Spinner} from "../components/Loading"
import TextEditor from "../components/TextEditor"
import LocationInput from "../components/LocationInput"

class ImageForm extends Component{
  constructor(props){
    super(props)
    this.state = {text:"", title:"", image:"", author:"", clicked: false}
    this.setFormApi = this.setFormApi.bind(this);
  }
  
  componentDidMount(){
    if(!this.props.currentUser.isAuthenticated){
      return this.props.history.push("/")
    }
    if(this.props.edit){
      this.setState({clicked: true})
      let image_id = this.props.match.params.imageId
      this.props.fetchImage(image_id)
        .then(()=>{
          this.setState({clicked:false})
          if(this.props.image.author._id!==this.props.currentUser.user.id){
            return this.props.history.push("/")
          }
          let data = this.props.image
          this.formApi.setValues({text: data.text, image: data.image, title: data.title})
          this.setState({text: data.text, image: data.image, title: data.title})
        })
    }
  }
  
  handleChange = e => this.setState({[e.target.name]: e.target.value})
  
  handleStoryForm = () => {
    if(this.state.clicked === false && this.formApi.getState().invalid === false){
      this.setState({
        text: this.state.text.toString("html"),
        clicked: true,  
        author: this.props.currentUser.user.id,
      }, 
        ()=>{
          let image_id = this.props.match.params.imageId 
          let formType = this.props.edit ? "edit" : ""
          let user_id = this.props.currentUser.user.id
          this.props.newImage(this.state, user_id, image_id,  formType)
            .then(()=>{
              this.setState({clicked: false});
              this.props.edit ? this.props.history.goBack() : this.props.history.push("/")
            })
            .catch(()=>{
              this.setState({clicked: false});
            })
        })  
    }
  }
  
  setFormApi(formApi) {
    this.formApi = formApi;
  }
  
  locationState=(location, lat, lng) =>{
    this.setState({location, lat, lng})
  }
  
  stateUp = (value) => {
      this.setState({text:value})
  }
  
  render(){
    if(this.props.currentUser.isAuthenticated === false){
      return <Redirect to="/signin"/>
    }
    
    const basicValidation = value => {
      return !value || value.length < 1 ? 'Field must not be empty' : null;
    }
    
    return (
      <div>
        <Form
        getApi={this.setFormApi}
        style={{margin: "20px auto"}}
        className="col-md-6 offset-md-2">
        {({ formState }) => (
        <div>
        {this.state.clicked === true && (
        <div style={{position: "absolute", right: "15px"}}><Spinner/></div>
        )}
        <p className="float-right" style={{fontSize:"0.8rem", color:"red"}}>{formState.errors.title}</p>
        <label htmlFor="title">Title</label>
        <Text
          field="title"
          className="form-control"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          validate={basicValidation}
          validateOnBlur
        /><br/>
        <p className="float-right" style={{fontSize:"0.8rem", color:"red"}}>{formState.errors.image}</p>
        <label htmlFor="image">Image</label>
        <Text
          field="image"
          className="form-control"
          type="text"
          name="image"
          value={this.state.image}
          onChange={this.handleChange}
          validate={basicValidation}
          validateOnBlur
        /><br/>
        <label >Location</label>
        <LocationInput locationState={this.locationState.bind(this)}/>
        <br/>
        <p className="float-right" style={{fontSize:"0.8rem", color:"red"}}>{formState.errors.text}</p>
        <label htmlFor="text">Text</label>
        <TextEditor 
          edit={this.props.edit}
          size="imageform" text={this.state.text} clicked={this.state.clicked} stateUp={this.stateUp.bind(this)}/>
        <button type="submit" onClick={this.handleStoryForm} className="btn mt-2 btn-dark">Submit</button>
        </div>
        )}
      </Form>
    </div>
    )
  }
}

function mapStateToProps(state){
        return {
            image: state.image,
            errors: state.errors,
            currentUser: state.currentUser
        }
    }

export default connect(mapStateToProps, { newImage, fetchImage })(ImageForm)