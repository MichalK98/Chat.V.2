import React, { Component } from 'react';
import { connect } from 'react-redux';

class NameInput extends Component {

    handleInput  = async (e) => {
        await this.setState({
            'username': e.target.value
        });

        if (this.state.username.length == 0) {
            this.setState({
                'username' : 'Anonymous'
            });
        }
        
        this.props.updateMessage(this.state.username);
    }


    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off">
                <input onInput={this.handleInput} type="text" placeholder="Skriv ditt namn..." name="name"/>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMessage: (username) => { dispatch({type: 'UPDATE_USERNAME', username: username})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);