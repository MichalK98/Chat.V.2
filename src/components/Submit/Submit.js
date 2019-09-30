import React, { Component } from 'react';
import { connect } from 'react-redux';

// SVG
import SendSvg from '../../svg/send.svg';

class Submit extends Component {
    handleChange = (e) => {
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.addMessage('hello');
    }

    render() {
        console.log(this.props);
        return (
            <div className="chat-footer">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input  onChange={this.handleChange} value={this.props.message} type="text" placeholder="Skriv något..."/>
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
        addMessage: (message) => { dispatch({type: 'ADD_MESSAGE', message: message})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit);