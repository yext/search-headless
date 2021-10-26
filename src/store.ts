import { configureStore, combineReducers, ReducersMapObject } from '@reduxjs/toolkit';

import queryReducer from './slices/query';
import verticalReducer from './slices/vertical';
import universalReducer from './slices/universal';
import filtersReducer from './slices/filters';
import spellCheckReducer from './slices/spellcheck';
import sessionTrackingReducer from './slices/sessiontracking';
import metaReducer from './slices/meta';
import locationReducer from './slices/location';
import { State } from './models/state';

export const baseReducers: ReducersMapObject<State> = {
  query: queryReducer,
  vertical: verticalReducer,
  universal: universalReducer,
  filters: filtersReducer,
  spellCheck: spellCheckReducer,
  sessionTracking: sessionTrackingReducer,
  meta: metaReducer,
  location: locationReducer
};

const coreReducer = combineReducers(baseReducers);
export const store = configureStore({
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: (state, action) => {
    if (action.type === 'set-state') {
      return action.payload;
    } else {
      return coreReducer(state, action);
    }
  },
  devTools: process.env.NODE_ENV === 'production' ? false : {
    name: 'AnswersHeadless'
  }
});