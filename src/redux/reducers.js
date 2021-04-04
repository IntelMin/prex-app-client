import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Blockchain from './blockchain/reducers';
import Market from './market/reducers';

const createReducer = (asyncReducers) =>
  combineReducers({
    Layout,
    Blockchain,
    Market,
    ...asyncReducers,
  });

export default createReducer;