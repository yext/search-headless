import { configureStore, EnhancedStore, Reducer, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';
import { ParentState } from './models/state';

export interface ActionWithHeadlessId extends PayloadAction<unknown> {
  headlessId: string
}

export type HeadlessEnhancedStore =
  EnhancedStore<ParentState, ActionWithHeadlessId, ThunkMiddleware<ParentState, AnyAction>[]>;

/**
 * This reducer will be replaced by initializations of {@link ReduxStateManager}.
 * It is necessary to still have this reducer, though, otherwise Redux's `@@init`
 * event will not function properly.
 */
const initialReducer: Reducer<ParentState, ActionWithHeadlessId> = (state: ParentState | undefined) => {
  return state || {};
};

export function createBaseStore(): HeadlessEnhancedStore {
  const store = configureStore({
    middleware:
      (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    reducer: initialReducer,
    devTools: process.env.NODE_ENV === 'production' ? false : {
      name: 'SearchHeadless'
    }
  });
  return store;
}
