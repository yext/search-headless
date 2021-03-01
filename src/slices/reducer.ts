import queryReducer from './query';
import verticalReducer from './vertical';
import filterReducer from './static-filters';
import universalReducer from './universal';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  query: queryReducer,
  vertical: verticalReducer,
  filters: filterReducer,
  universal: universalReducer,
});