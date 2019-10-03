import React, { Component } from 'react';

// Socket.io
import socket from '../../ws';

// SVG
import HomeSvg from '../../svg/home.svg';

class ChannelActive extends Component {
    state = {
        count: 0
    }

    componentDidMount() {
        socket.on('counter', (data) => {
            this.setState({
                count: data.count
            });
        });
    }
    
    componentDidUpdate() {
        socket.on('counter', (data) => {
            this.setState({
                count: data.count
            });
        });
    }

    render() {
        return (
            <div className="chat-header">
                <div className="icon">
                    <HomeSvg/>
                </div>
                <div className="info">
                    <span className="title">#general</span>
                    <span className="online">{this.state.count} aktiva användare</span>
                </div>
                <a href="#channels-wrapper" className="btn-mobile">#</a>
            </div>
        )
    }
}
export default ChannelActive;