import { Reducer, combineReducers } from '@reduxjs/toolkit';
import { ParentState, State } from './models/state';

import createQuerySlice from './slices/query';
import createVerticalSlice from './slices/vertical';
import createUniversalSlice from './slices/universal';
import createFiltersSlice from './slices/filters';
import createSpellCheckSlice from './slices/spellcheck';
import createSessionTrackingSlice from './slices/sessiontracking';
import createMetaSlice from './slices/meta';
import createLocationSlice from './slices/location';
import { ActionWithHeadlessId } from './store';
import createFilterSearchSlice from './slices/filtersearch';

/**
 * Manages the current map of headless IDs to Reducers.
 */
export default class HeadlessReducerManager {
  private headlessIdToReducer: Record<string, Reducer> = {};

  addAnswersReducer(headlessId: string): void {
    this.headlessIdToReducer[headlessId] = createAnswersReducer(headlessId + '/');
  }

  getParentReducer(): Reducer<ParentState, ActionWithHeadlessId> {
    // set-state should only update the state tree for the AnswersHeadless instance
    // that dispatched it
    const coreReducer = combineReducers(this.headlessIdToReducer);
    return (state, action) => {
      if (action.type === 'set-state') {
        return {
          ...state,
          [action.headlessId]: action.payload
        };
      } else {
        return coreReducer(state, action);
      }
    };
  }
}

function createAnswersReducer(prefix: string): Reducer<State> {
  return combineReducers({
    query: createQuerySlice(prefix).reducer,
    vertical: createVerticalSlice(prefix).reducer,
    universal: createUniversalSlice(prefix).reducer,
    filterSearch: createFilterSearchSlice(prefix).reducer,
    filters: createFiltersSlice(prefix).reducer,
    spellCheck: createSpellCheckSlice(prefix).reducer,
    sessionTracking: createSessionTrackingSlice(prefix).reducer,
    meta: createMetaSlice(prefix).reducer,
    location: createLocationSlice(prefix).reducer
  });
}