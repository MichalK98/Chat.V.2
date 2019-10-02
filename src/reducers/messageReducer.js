import _ from "lodash";

const initState = {
    messages: [
        {id: 1, username: 'You', message: 'Hi, data from reducer!'},
        {id: 2, username: 'Mattias', message: 'Wow..'},
        {id: 3, username: 'Alien', message: 'Awesome!'}
    ]
}

const messageReducer = (state = initState, action) => {
    if (action.type === 'WRITE_MESSAGE') {
        return { ...state, messages: [...state.messages, action.message] };
    } else {
        return state;
    }
}

export default messageReducer;