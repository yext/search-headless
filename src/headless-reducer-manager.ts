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
import createDirectAnswerSlice from './slices/directanswer';
import createSearchStatusSlice from './slices/searchstatus';

/**
 * Manages the current map of headless IDs to Reducers.
 */
export default class HeadlessReducerManager {
  /**
   * A mapping of unique headless IDs to Reducers.
   */
  private headlessIdToReducer: Record<string, Reducer> = {};

  /**
   * Adds a mapping of the provided headless ID to an Answers state Reducer into
   * {@link headlessIdToReducer}.
   *
   * @param headlessId - The ID of the AnswersHeadless instance for which to add a
   *                     Reducer
   */
  addAnswersReducer(headlessId: string): void {
    this.headlessIdToReducer[headlessId] = createAnswersReducer(headlessId + '/');
  }

  /**
   * Gets the parent Reducer for the {@link ParentState} of the mapping of
   * AnswersHeadless instances.
   *
   * @returns A parent Reducer function that is a combination of the Reducers in
   *          {@link headlessIdToReducer}
   */
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
    directAnswer: createDirectAnswerSlice(prefix).reducer,
    filters: createFiltersSlice(prefix).reducer,
    spellCheck: createSpellCheckSlice(prefix).reducer,
    sessionTracking: createSessionTrackingSlice(prefix).reducer,
    searchStatus: createSearchStatusSlice(prefix).reducer,
    meta: createMetaSlice(prefix).reducer,
    location: createLocationSlice(prefix).reducer
  });
}