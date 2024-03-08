import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Message from '../components/message';
import { fetchMessages } from '../actions';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messagesContainer = null; // Initialisation de la référence à null
    this.setMessagesContainerRef = element => {
      this.messagesContainer = element; // Définit la référence à l'élément DOM
    };
  }
  componentDidMount() {
    this.fetchMessageIntervale();
    this.scrollToBottom();
  }
  //setInterval(func, delay) -> on doit lui passer une fonction anonyme ou pas pour que ça marche (() => {})

  componentDidUpdate(prevProps) {
    // Vérifiez si le channel sélectionné a changé
    if (this.props.selectedChannel !== prevProps.selectedChannel) {
      // Si le channel a changé, rechargez les messages pour le nouveau channel
      this.props.fetchMessages(this.props.selectedChannel); //remonter les messages directement une fois le channel changé
      this.fetchMessageIntervale();
    }

    // Continuez de faire défiler vers le bas à chaque mise à jour
    if (this.isNearBottom()) {
      this.scrollToBottom();
    }
  }

  isNearBottom = () => {
    const threshold = 100; // Pixels du bas à considérer comme "proche du bas"
    const position = this.messagesContainer.scrollTop + this.messagesContainer.clientHeight;
    const height = this.messagesContainer.scrollHeight;
    return position + threshold >= height;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchMessageIntervale() {
//setInterval(func, delay) -> on doit lui passer une fonction anonyme ou pas pour que ça marche (() => {})
  clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.fetchMessages(this.props.selectedChannel);
    }, 1000);
  }

  scrollToBottom = () => {
    if (this.messagesContainer) {
      const scrollHeight = this.messagesContainer.scrollHeight;
      const height = this.messagesContainer.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messagesContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  render() {
    return (
      <div ref={this.setMessagesContainerRef} style={{overflowY: 'auto', maxHeight: '75vh'}}>
        {this.props.messages.map((message) => <Message message={message} key={`${message.author}-${message.created_at}`}/>)}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    fetchMessages: fetchMessages
  },
  dispatch
  );
}

function mapReduxStateTopProps(reduxState) {
  return {
    messages: reduxState.messages,
    selectedChannel: reduxState.selectedChannel
  };
}

export default connect(mapReduxStateTopProps, mapDispatchToProps)(MessageList);
