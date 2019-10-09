import React, { Component } from 'react';

// Socket.io
import socket from '../../ws';

// SVG
import HomeSvg from '../../svg/home.svg';
import ThumbsUpSvg from '../../svg/thumbs-up.svg';
import CoffeSvg from '../../svg/coffe.svg';

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

    handleClick(id) {
        console.log('Channel_id = ', id);
    }

    render() {
        return (
            <div>
                {this.state.channels.map((channel) => (
                    <div onClick={this.handleClick.bind(this, channel.id)} className="channels-single" key={channel.id}>
                        <div className="icon">
                            {(channel.icon == 'Home' ? <HomeSvg/> : "")}
                            {(channel.icon == 'Thumbs-Up' ? <ThumbsUpSvg/> : "")}
                            {(channel.icon == 'Coffe' ? <CoffeSvg/> : "")}
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