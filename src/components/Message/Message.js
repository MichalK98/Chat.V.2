import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {
    render() {
        return (
            <ul id="chatroom">
                {this.props.messages.map((msg) => (
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
        messages: state.messages
    }
}

export default connect(mapStateToProps)(Message);