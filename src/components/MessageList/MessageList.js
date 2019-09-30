import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// Components
import Message from '../Message';

class MessageList extends Component {
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
                <ul id="chatroom">
                    <Message/>
                </ul>
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
            </SimpleBar>
        )
    }
}
export default MessageList;