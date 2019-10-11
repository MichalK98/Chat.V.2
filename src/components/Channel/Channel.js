import React, { Component } from 'react';

// Socket.io
import socket from '../../ws';

// SVG
import HomeSvg from '../../svg/home.svg';
import ThumbsUpSvg from '../../svg/thumbs-up.svg';
import CoffeSvg from '../../svg/coffe.svg';

class Channel extends Component {
    constructor() {
        socket.on("channels", (data) => {
            this.setState({
                channels: data
            });
        });
        super();
    }

    state = {
        channels: []
    }

    handleClick(channel) {
        console.log('Channel_id = ', channel.id);
        socket.emit("channel", {channel: channel});

        socket.emit("join", {channel_title: channel.title});
    }

    render() {
        return (
            <div>
                {this.state.channels.map((channel) => (
                    <div onClick={this.handleClick.bind(this, channel)} className="channels-single" key={channel.id}>
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