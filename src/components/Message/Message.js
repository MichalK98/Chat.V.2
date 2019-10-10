import React, { Component } from 'react';
import { format } from "date-fns";

// Socket.io
import socket from '../../ws';

class Message extends Component {
    constructor() {
        socket.on('messages', (data) => {
            this.setState({
                messages: data
            });
            console.log(this.state);
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
        socket.on('clear', () => this.setState({ messages: [] }));
        return (
            <div>
                <ul id="chatroom">
                    {this.state.messages.map((msg) => (
                        <li className={(msg.username == 'You' ? "chat-me" : "")} key={msg.id}>
                            <p>{msg.message}</p>
                            <small>{msg.username}</small>
                            <small>{msg.date ? msg.date : ""}</small>
                        </li>
                    )).reverse()}
                </ul>
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
            </div>
        )
    }
}

export default Message;