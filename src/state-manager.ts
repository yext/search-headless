import { configureStore, combineReducers } from '@reduxjs/toolkit';

import queryReducer from './slices/query';
import verticalReducer from './slices/vertical';
import universalReducer from './slices/universal';
import StateListener from './state-listener';

export default class StateManager {
  private store;

  constructor() {
    const coreReducer = combineReducers({
      query: queryReducer,
      vertical: verticalReducer,
      universal: universalReducer,
    });

    this.store = configureStore({ 
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