import { combineReducers } from 'redux';
import Layout from './layout/reducers';

const createReducer = (asyncReducers) =>
  combineReducers({
    Layout,
    ...asyncReducers,
  });

export default createReducer;