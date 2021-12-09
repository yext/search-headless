import { configureStore, EnhancedStore, Reducer, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { ParentState } from './models/state';

/**
 * An action with the ID of the AnswersHeadless instance that dispatched it.
 */
export interface ActionWithHeadlessId extends PayloadAction<unknown> {
  /**
   * The ID of the AnswersHeadless instance.
   */
  headlessId: string
}

/**
 * This reducer will be replaced by initializations of {@link ReduxStateManager}.
 * It is necessary to still have this reducer, though, otherwise Redux's `@@init`
 * event will not function properly.
 */
const initialReducer: Reducer<ParentState> = (state: ParentState | undefined) => {
  return state || {};
};

/**
 * Creates a base Redux store with the {@link initialReducer} as the reducer and
 * developer tools if it is not a production environment.
 *
 * @returns The newly created base Redux store
 */
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
