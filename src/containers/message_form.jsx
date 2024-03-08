import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Picker } from 'emoji-mart';
import { createMessage } from "../actions";
// import 'emoji-mart/css/emoji-mart.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(createMessage);
    this.props.createMessage(this.props.selectedChannel, this.props.currentUser, this.state.value);
    this.setState({ value: '' });
    //no estoy segura de esto
  }


  render() {
    return (
      <div >
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.value}
            className="form-control"
            placeholder="Message"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2" >
          </input>
          <button type="submit" className="btn btn-send">Send</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    createMessage: createMessage
  },
    dispatch
  );
}

function mapReduxStateTopProps(reduxState) {
  return {
    selectedChannel: reduxState.selectedChannel,
    currentUser: reduxState.currentUser
  //redux states à utilizar en el value ?
  };
}

export default connect(mapReduxStateTopProps, mapDispatchToProps)(MessageForm);
