import { configureStore, combineReducers, ReducersMapObject, EnhancedStore } from '@reduxjs/toolkit';

import createQuerySlice from './slices/query';
import createVerticalSlice from './slices/vertical';
import createUniversalSlice from './slices/universal';
import createFiltersSlice from './slices/filters';
import createSpellCheckSlice from './slices/spellcheck';
import createSessionTrackingSlice from './slices/sessiontracking';
import createMetaSlice from './slices/meta';
import createLocationSlice from './slices/location';
import { State } from './models/state';

export const baseReducers: ReducersMapObject<Omit<State, 'childStates'>> = {
  query: createQuerySlice().reducer,
  vertical: createVerticalSlice().reducer,
  universal: createUniversalSlice().reducer,
  filters: createFiltersSlice().reducer,
  spellCheck: createSpellCheckSlice().reducer,
  sessionTracking: createSessionTrackingSlice().reducer,
  meta: createMetaSlice().reducer,
  location: createLocationSlice().reducer
};
const coreReducer = combineReducers(baseReducers);

/**
 * Outside of testing, this method should only be used below for instantiating the store exported below.
 */
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

export const store = createBaseStore();