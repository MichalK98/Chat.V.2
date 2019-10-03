import React, { Component } from 'react';
import { connect } from 'react-redux';

class NameInput extends Component {

    handleInput  = async (e) => {
        // setState to the user input
        await this.setState({
            'username': e.target.value
        });
        this.props.updateMessage(this.state.username);
        // if 'username' lenght = 0 setState to 'Anonymous'
        // if (this.state.username.length == 0) {
        //     this.setState({
        //         'username' : 'Anonymous'
        //     });
        // }
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