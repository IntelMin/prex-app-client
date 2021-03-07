import { applyMiddleware, createStore } from 'redux';
import createReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const configureStore = (initialState = {}) => {
  return createStore(createReducer(), initialState, applyMiddleware(thunkMiddleware));
};
export default configureStore;
