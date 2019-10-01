import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        this.props.writeMessage(this.state.message);
        this.clear();
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

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        writeMessage: (message) => { dispatch({type: 'WRITE_MESSAGE', messages: {id: Math.random(), username: 'You', message: message}})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit);