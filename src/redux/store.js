import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


export default store = createStore(reducers, applyMiddleware(thunk));