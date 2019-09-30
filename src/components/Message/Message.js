import React, { Component } from 'react';

class Message extends Component {

    state = {
        messages: [
            {id: 1, username: 'You', message: 'Hi, try out my new Chat.V.2!'},
            {id: 2, username: 'Mattias', message: 'Ehh..'},
            {id: 3, username: 'Alien', message: 'Hello there!'}
        ]
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
export default Message;