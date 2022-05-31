import { applyMiddleware, compose, createStore } from 'redux';
import authreducer from './reducers/AuthReducer';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    authreducer,
    composeEnhancers(applyMiddleware(thunk))

);

export default store;