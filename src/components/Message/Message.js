import React, { Component } from 'react';
import { format } from "date-fns";

// Socket.io
import socket from '../../ws';

class Message extends Component {
    constructor() {
        socket.on('message', (data) => {
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

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <ul id="chatroom">
                    {this.state.messages.map((msg) => (
                        <li className={(msg.username == 'You' ? "chat-me" : "")} key={msg.id}>
                            <p>{msg.message}</p>
                            <small>{msg.username}</small>
                            <small>{msg.date ? format(new Date(msg.date), "HH:mm") : ""}</small>
                        </li>
                    )).reverse()}
                </ul>
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
            </div>
        )
    }
}

export default Message;