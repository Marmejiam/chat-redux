import React, { Component } from "react";
import { connect } from "react-redux";
import MessageList from '../containers/message_list';
import MessageForm from '../containers/message_form';
import ChannelList from '../containers/channel_list';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="app row">
        <div className="channel-list col-sm-4">
          <h1 className="titre-channel-list">Supe chat</h1>
          <ChannelList />
        </div>
        <div className="messages col-sm-8">
          <h1 className="titre-messages-list">Channel {this.props.selectedChannel}</h1>
          <div className="messages-content">
            <div className="messages-list">
              <MessageList />
            </div>
            <div className="messages-input">
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapReduxStateTopProps(reduxState) {
  return {
    selectedChannel: reduxState.selectedChannel,
  };
}

export default connect(mapReduxStateTopProps)(App);
