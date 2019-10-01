const initState = {
    messages: [
        {id: 1, username: 'You', message: 'Hi, data from reducer!'},
        {id: 2, username: 'Mattias', message: 'Wow..'},
        {id: 3, username: 'Alien', message: 'Avesome!'}
    ]
}

const messageReducer = (state = initState, action) => {
    if (action.type === 'WRITE_MESSAGE') {
        state.messages.push(action.messages);
        console.log('State ',state.messages);
        console.log('Action ',action.messages);
    }
    return state;
}

export default messageReducer;