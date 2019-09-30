import React, { Component } from 'react';

class NameInput extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleInput = (e) => {
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