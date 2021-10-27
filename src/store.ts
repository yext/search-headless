import { configureStore, combineReducers, ReducersMapObject, EnhancedStore } from '@reduxjs/toolkit';

import createQuerySlice from './slices/query';
import createVerticalSlice from './slices/vertical';
import createUniversalSlice from './slices/universal';
import createFiltersSlice from './slices/filters';
import createSpellCheckSlice from './slices/spellcheck';
import createSessionTrackingSlice from './slices/sessiontracking';
import createMetaSlice from './slices/meta';
import createLocationSlice from './slices/location';

export function createAnswersReducers(prefix = ''): ReducersMapObject {
  return {
    query: createQuerySlice(prefix).reducer,
    vertical: createVerticalSlice(prefix).reducer,
    universal: createUniversalSlice(prefix).reducer,
    filters: createFiltersSlice(prefix).reducer,
    spellCheck: createSpellCheckSlice(prefix).reducer,
    sessionTracking: createSessionTrackingSlice(prefix).reducer,
    meta: createMetaSlice(prefix).reducer,
    location: createLocationSlice(prefix).reducer
  };
}

export const baseReducers = createAnswersReducers();
const coreReducer = combineReducers(baseReducers);

export function createBaseStore(): EnhancedStore {
  return configureStore({
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
}
