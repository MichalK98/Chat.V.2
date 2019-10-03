import { combineReducers } from 'redux';

// Reducers
import usernameReducer from './usernameReducer';

const rootReducer = combineReducers({
    username: usernameReducer
});

export default rootReducer;