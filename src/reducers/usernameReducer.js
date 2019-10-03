const initState = {
    username: 'Alien'
}

const usernameReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_USERNAME') {
        return {
            username: action.username
        }
    }
    return state;
}

export default usernameReducer;