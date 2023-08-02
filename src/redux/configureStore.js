import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'

export default configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}