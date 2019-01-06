import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

class TextEditor extends Component {
  state = {
    value: RichTextEditor.createEmptyValue(),
    edit: false,
    mobile: false
  }
  
  componentDidMount(){
    if(navigator.userAgent.includes("Android")){
      this.setState({value:"", mobile:true})
    }
  }
  
  componentDidUpdate(prevProps){
    if(this.props.clicked !== prevProps.clicked && this.props.text.length === 0){
      if(!this.state.mobile){
      this.setState({value: RichTextEditor.createEmptyValue()})
      } else {
        this.setState({value:""})
      }
    }
    if(this.props.edit && this.props.text !== prevProps.text && this.state.edit===false){
      let value = RichTextEditor.createValueFromString(this.props.text, "html")
      this.setState({value:value, edit:true})
    }
  }
        
  onChange = (value) => {
    this.setState({value});
    this.props.stateUp(value)
  };
  
  onChangeMobile = e => {
    this.setState({value: e.target.value})
    this.props.stateUp(e.target.value)
  }

  render () {
    if(this.state.mobile === true){
      return (
        <textarea  rows="5" onChange={this.onChangeMobile} value={this.state.value} className="form-control"/>)
    }
    return (
      <RichTextEditor
        style={{fontFamiliy: "inherit"}}
        className={this.props.size}
        value={this.state.value}
        onChange={this.onChange}>
        </RichTextEditor>
    );
  }
}

export default TextEditor