import { Unsubscribe } from '@reduxjs/toolkit';
import StateListener from './models/state-listener';
import StateManager from './models/state-manager';
import { State } from './models/state';
import HeadlessReducerManager from './headless-reducer-manager';
import { HeadlessEnhancedStore } from './store';

/**
 * A Redux-backed implementation of the {@link StateManager} interface. Redux is used to
 * manage the state, dispatch events, and register state listeners.
 */
export default class ReduxStateManager implements StateManager {
  constructor(
    private store: HeadlessEnhancedStore,
    private headlessId: string,
    headlessReducerManager: HeadlessReducerManager
  ) {
    headlessReducerManager.addAnswersReducer(this.headlessId);
    store.replaceReducer(headlessReducerManager.getParentReducer());
  }

  getState(): State {
    const state = this.store.getState();
    return state[this.headlessId];
  }

  dispatchEvent(type: string, payload?: unknown): void {
    const answersActionType = type === 'set-state' ? 'set-state' : this.headlessId + '/' + type;
    this.store.dispatch({
      type: answersActionType,
      payload,
      headlessId: this.headlessId
    });
  }

  addListener<T>(listener: StateListener<T>): Unsubscribe {
    let previousValue = listener.valueAccessor(this.getState());
    return this.store.subscribe(() => {
      const currentValue: T = listener.valueAccessor(this.getState());
      if (currentValue !== previousValue) {
        previousValue = currentValue;
        listener.callback(currentValue);
      }
    });
  }
}