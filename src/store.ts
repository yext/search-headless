import { configureStore, EnhancedStore, Reducer, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { ParentState } from './models/state';

export interface ActionWithHeadlessId extends PayloadAction<unknown> {
  headlessId: string
}

/**
 * This reducer will be replaced by initializations of {@link ReduxStateManager}.
 * It is necessary to still have this reducer, though, other wise Redux's `@@init`
 * event will not function properly.
 */
const initialReducer: Reducer<ParentState> = (state: ParentState | undefined) => {
  return state || {};
};

export function createBaseStore(): EnhancedStore<ParentState, ActionWithHeadlessId> {
  const store = configureStore<ParentState, ActionWithHeadlessId, Middleware<unknown, ParentState>[]>({
    middleware:
      (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    reducer: initialReducer,
    devTools: process.env.NODE_ENV === 'production' ? false : {
      name: 'AnswersHeadless'
    }
  });
  return store;
}
