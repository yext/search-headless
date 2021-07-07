import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import queryReducer from './slices/query';
import verticalReducer from './slices/vertical';
import universalReducer from './slices/universal';
import filtersReducer from './slices/filters';
import StateListener from './types/state-listener';
import StateManager from './types/state-manager';

export default class ReduxStateManager implements StateManager {
  private store;

  constructor() {
    const coreReducer = combineReducers({
      query: queryReducer,
      vertical: verticalReducer,
      universal: universalReducer,
      filters: filtersReducer
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

  getState() {
    return this.store.getState();
  }

  dispatchEvent(type, payload) {
    this.store.dispatch({ type, payload });
  }

  addListener<T>(listener: StateListener<T>) {
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