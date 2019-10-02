import _ from "lodash";

const initState = {
    messages: [
        {id: 1, username: 'You', message: 'Hi, data from reducer!'},
        {id: 2, username: 'Mattias', message: 'Wow..'},
        {id: 3, username: 'Alien', message: 'Awesome!'}
    ]
}

const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case "WRITE_MESSAGE":
            return { ...state, messages: [...state.messages, action.message] };
        default:
            return state;
    }
}

export default messageReducer;