import React, { Component } from "react";
import {emojify} from 'react-emojione';

class Message extends Component {
  render() {
    const authorColor = stringToColor(this.props.message.author);
    const contentWithEmoji = emojify(this.props.message.content, { style: {height:18} });

    //FORMATAGE DATE ET HEURE
    const date = new Date(this.props.message.created_at)
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const formattedDate = `${timeString} - ${dateString}`;
    return (
      <div>
        <div className="message-header">
          <h3 className="message-author" style={{ color: authorColor }} >{this.props.message.author} </h3>
          <h3 className="message-date">{formattedDate}</h3>
        </div>
        <p className="message-content">{contentWithEmoji}</p>
      </div>
    );
  }
}

const stringToColor = (string, saturation = 100, lightness = 75) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convertir à 32bit entier
  }
  return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
};

export default Message;
