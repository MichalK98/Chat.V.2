import React, { Component } from 'react';

// Scroll
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// Socket.io
import socket from '../../ws';

// Components
import Message from '../Message';

class MessageList extends Component {
    constructor() {
        socket.on("messages", (data) => {
            this.setState({
                messages: data
            });
        });
        socket.on("newMessages", (data) => {
            this.setState({
                messages: [...this.state.messages, data[0]]
            });
        });
        super();
    }

    state = {
        messages: []
    };

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
            <SimpleBar className="chat-body">
                <ul className="messages">
                    {this.state.messages.map((msg) => (
                        <Message key={msg.id} username={msg.username} message={msg.message} date={msg.date} />
                    )).reverse()}
                </ul>
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
            </SimpleBar>
        )
    }
}

export default MessageList;