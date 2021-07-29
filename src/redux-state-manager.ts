import { configureStore, combineReducers } from '@reduxjs/toolkit';

import queryReducer from './slices/query';
import verticalReducer from './slices/vertical';
import universalReducer from './slices/universal';
import filtersReducer from './slices/filters';
import facetsReducer from './slices/facets';
import StateListener from './models/state-listener';
import StateManager from './models/state-manager';
import { State } from './models/state';

/**
 * A Redux-backed implementation of the {@link StateManager} interface. Redux is used to
 * manage the state, dispatch events, and register state listeners.
 */
export default class ReduxStateManager implements StateManager {
  private store;

  constructor() {
    const coreReducer = combineReducers({
      query: queryReducer,
      vertical: verticalReducer,
      universal: universalReducer,
      filters: filtersReducer,
      facets: facetsReducer,
    });

    this.store = configureStore({
      middleware:
        (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
      reducer: (state, action) => {
        if (action.type === 'set-state') {
          return action.payload;
        } else {
          return coreReducer(state, action);
        }
      },
    });
  }

  getState(): State {
    return this.store.getState();
  }

  dispatchEvent(type, payload): void {
    this.store.dispatch({ type, payload });
  }

  addListener<T>(listener: StateListener<T>): void {
    let previousValue: T;
    this.store.subscribe(() => {
      const currentValue: T = listener.valueAccessor(this.getState());
      if (currentValue !== previousValue) {
        listener.callback(currentValue);
        previousValue = currentValue;
      }
    });
  }
}