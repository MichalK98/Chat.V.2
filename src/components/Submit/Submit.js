import React, { Component } from 'react';

// SVG
import SendSvg from '../../svg/send.svg';

class Submit extends Component {
    render() {
        return (
            <div className="chat-footer">
                <form autoComplete="off">
                    <input type="text" placeholder="Skriv något..."/>
                    <button id="btnSend"><SendSvg/></button>
                </form>
            </div>
        )
    }
}
export default Submit;