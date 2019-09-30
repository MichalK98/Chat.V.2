import React, { Component } from 'react';

// Components
import NameInput from '../NameInput';

class Header extends Component {
    render() {
        return (
            <div className="channels-header">
                <div className="info">
                    <h1>Chat.app</h1>
                    <a href="#chat-wrapper" className="btn-mobile">#</a>
                </div>
                <NameInput/>
            </div>
        )
    }
}
export default Header;