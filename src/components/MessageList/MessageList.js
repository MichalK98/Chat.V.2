import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// Components
import Message from '../Message';

class MessageList extends Component {
    render() {
        return (
            <SimpleBar className="chat-body">
                <Message/>
            </SimpleBar>
        )
    }
}
export default MessageList;