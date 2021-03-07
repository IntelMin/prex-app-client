import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Blockchain from './blockchain/reducers';

const createReducer = (asyncReducers) =>
  combineReducers({
    Layout,
    Blockchain,
    ...asyncReducers,
  });

export default createReducer;