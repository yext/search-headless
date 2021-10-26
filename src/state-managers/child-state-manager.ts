import { EnhancedStore, Unsubscribe } from '@reduxjs/toolkit';
import StateListener from '../models/state-listener';
import StateManager from '../models/state-manager';
import { State } from '../models/state';
import { store } from '../store';

/**
 * A Redux-backed implementation of the {@link StateManager} interface. Redux is used to
 * manage the state, dispatch events, and register state listeners.
 */
export default class ChildStateManager implements StateManager {
  private store: EnhancedStore;

  constructor(parentStore: EnhancedStore) {
    // const combinedReducer = parentStore.
    // parentStore.replaceReducer()    
    this.store = store;
  }

  getState(): State {
    return this.store.getState();
  }

  dispatchEvent(type: string, payload?: unknown): void {
    this.store.dispatch({ type, payload });
  }

  addListener<T>(listener: StateListener<T>): Unsubscribe {
    let previousValue = listener.valueAccessor(this.getState());
    return this.store.subscribe(() => {
      const currentValue: T = listener.valueAccessor(this.getState());
      if (currentValue !== previousValue) {
        listener.callback(currentValue);
        previousValue = currentValue;
      }
    });
  }
}