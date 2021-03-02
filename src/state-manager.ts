import { configureStore } from '@reduxjs/toolkit';

import coreReducer from './slices/reducer';

export default class StateManager {
  private store;

  constructor() {
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

  addListener(listener) {
    this.store.subscribe(listener);
  }
}