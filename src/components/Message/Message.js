import React, { Component } from 'react';
import { connect } from 'react-redux';

// Socket.io
import socket from '../../ws';

class Message extends Component {
    constructor() {
        socket.on('message', (data) => {
            console.log('Message constructor', data);
            // push new message to array that exists in state
            this.setState({
                messages: [...this.state.messages, data]
            });
        });
        super();
    }

    state = {
        messages: []
    }

    render() {
        return (
            <ul id="chatroom">
                {this.state.messages.map((msg) => (
                    <li className={(msg.username == 'You' ? "chat-me" : "")} key={msg.id}>
                        <p>{msg.message}</p>
                        <small>{msg.username}</small>
                    </li>
                )).reverse()}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Message);   