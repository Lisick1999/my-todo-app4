import { createStore, applyMiddleware, compose } from 'redux'; // Import compose
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
