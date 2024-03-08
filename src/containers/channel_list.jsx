import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectChannel } from "../actions";


class ChannelList extends Component {
  handleClik = (channel) => {
    this.props.selectChannel(channel);
  }

  render() {
    return (
      <div className="channels-list">
        <ul>
          {this.props.channels.map((channel) => {
            let classes = "channel";
            if (channel === this.props.selectedChannel) {
              classes += " selected";
            }

            return (
              <li className={classes} key={channel} onClick={() => this.handleClik(channel)}>
                {/* <i className="fas fa-coffee"></i> */}
                <i className="fas fa-user-friends"></i>{channel}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    selectChannel: selectChannel
  },
  dispatch
  );
}

function mapReduxStateTopProps(reduxState) {
  return {
    selectedChannel: reduxState.selectedChannel,
    channels: reduxState.channels
  };
}

export default connect(mapReduxStateTopProps, mapDispatchToProps)(ChannelList);
