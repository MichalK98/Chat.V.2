import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Redux rootReducer
import rootReducer from './reducers/rootReducer';

// Redux Store
const store = createStore(rootReducer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));