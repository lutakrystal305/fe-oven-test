import { combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import authentication from './authenticate';

const reducer = combineReducers({
  authentication
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
