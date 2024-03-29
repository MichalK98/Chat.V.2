import React, { Component } from 'react';
import { connect } from 'react-redux';

// Socket.io
import socket from '../../ws';

// SVG
import SendSvg from '../../svg/send.svg';

class Submit extends Component {
    constructor() {
        socket.on("channelActive", (data) => {
            this.setState({
                channel: data
            });
        });
        super();
    }

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
            socket.emit("message", {channel: this.state.channel, message: this.state.message, username: this.props.username});
            this.clear();
        }
    }

    render() {
        console.log(this.state);
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

const mapStateToProps = (state) => {
    return {
        username: state.username.username
    }
}

export default connect(mapStateToProps)(Submit);