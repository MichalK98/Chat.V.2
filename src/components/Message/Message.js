import React, { Component } from 'react';

class Message extends Component {

    render() {
        return (
            <li className={(this.props.username == 'You' ? "chat-me" : "")}>
                <p>{this.props.message}</p>
                <small>{this.props.username}</small>
                <small>{this.props.date ? this.props.date : ""}</small>
            </li>
        )
    }
}

export default Message;