import queryReducer from './query';
import verticalReducer from './vertical';
import universalReducer from './universal';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  query: queryReducer,
  vertical: verticalReducer,
  universal: universalReducer,
});