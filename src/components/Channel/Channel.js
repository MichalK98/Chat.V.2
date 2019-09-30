import React, { Component } from 'react';

// SVG
import HomeSvg from '../../svg/home.svg';

class Channel extends Component {
    render() {
        return (
            <div className="channels-single">
                <div className="icon">
                    <HomeSvg/>
                </div>
                <div className="info">
                    <span className="title">#general</span>
                    <span className="desc">Just about anything</span>
                </div>
            </div>
        )
    }
}
export default Channel;