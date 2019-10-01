import { combineReducers } from 'redux';

// Reducers
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    message: messageReducer
});

export default rootReducer;