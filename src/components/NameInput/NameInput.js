import React, { Component } from 'react';
import socket from "../../ws";

class NameInput extends Component {

    handleInput  = async (e) => {
        // // setState to the user input
        // await this.setState({
        //     'username': e.target.value
        // });
        // // if 'username' lenght = 0 setState to 'Anonymous'
        // if (this.state.username.length == 0) {
        //     this.setState({
        //         'username' : 'Anonymous'
        //     });
        // }
        // socket.emit('new_username', {username : this.state.username});
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
export default NameInput;