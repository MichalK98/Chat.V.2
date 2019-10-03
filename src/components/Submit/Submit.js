import React, { Component } from 'react';

// Socket.io
import socket from '../../ws';

// SVG
import SendSvg from '../../svg/send.svg';

class Submit extends Component {

    state = {
        message: []
    }

    clear = async () => {
        await this.setState({
            message: ''
        });
    }
    
    handleChange = async (e) => {
        await this.setState({
            message: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //Emit message
        if(this.state.message.length >= 1) {
            socket.emit('message', {id: Math.random(), message: this.state.message, username: 'Michal'});
            this.clear();
        }
    }

    render() {
        return (
            <div className="chat-footer">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input  onChange={this.handleChange} value={this.state.message} type="text" placeholder="Skriv något..."/>
                    <button id="btnSend"><SendSvg/></button>
                </form>
            </div>
        )
    }
}

export default Submit;