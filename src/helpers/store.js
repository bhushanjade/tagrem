
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const inititalState = {};
//for debugging in dev mode.
// const devTools = process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     : null;

const store = createStore(
    rootReducer,
    inititalState,
    compose(applyMiddleware(thunk)),
);

export default store;