const initState = {
    messages: [
        {id: 1, username: 'You', message: 'Hi, data from reducer!'},
        {id: 2, username: 'Mattias', message: 'Wow..'},
        {id: 3, username: 'Alien', message: 'Avesome!'}
    ]
}

const rootReducer = (state = initState, action) => {
    console.log(action);
    return state;
}

export default rootReducer;