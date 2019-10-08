import React, { Component } from 'react';

// Socket.io
import socket from '../../ws';

// SVG
import HomeSvg from '../../svg/home.svg';

class Channel extends Component {
    constructor() {
        socket.on('channel', (data) => {
            // push new message to array that exists in state
            this.setState({
                channels: [...this.state.channels, data]
            });
        });
        super();
    }
    state = {
        channels: []
    }

    render() {
        return (
            <div>
                {this.state.channels.map((channel) => (
                    <div className="channels-single" key={channel.id}>
                        <div className="icon">
                            <HomeSvg/>
                        </div>
                        <div className="info">
                            <span className="title">#{channel.title}</span>
                            <span className="desc">{channel.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default Channel;