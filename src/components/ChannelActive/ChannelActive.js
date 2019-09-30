import React, { Component } from 'react';

// SVG
import HomeSvg from '../../svg/home.svg';

class ChannelActive extends Component {
    render() {
        return (
            <div className="chat-header">
                <div className="icon">
                    <HomeSvg/>
                </div>
                <div className="info">
                    <span className="title">#general</span>
                    <span className="online">4 aktiva användare</span>
                </div>
                <a href="#channels-wrapper" className="btn-mobile">#</a>
            </div>
        )
    }
}
export default ChannelActive;