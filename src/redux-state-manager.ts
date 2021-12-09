import { EnhancedStore, Unsubscribe } from '@reduxjs/toolkit';
import StateListener from './models/state-listener';
import StateManager from './models/state-manager';
import { ParentState, State } from './models/state';
import HeadlessReducerManager from './headless-reducer-manager';
import { ActionWithHeadlessId } from './store';

/**
 * A Redux-backed implementation of the {@link StateManager} interface. Redux is used to
 * manage the state, dispatch events, and register state listeners.
 */
export default class ReduxStateManager implements StateManager {
  /**
   * Adds an Answers state Reducer for the instance of AnswersHeadless and updates the
   * parent Reducer for the Redux store.
   *
   * @param store - The Redux store
   * @param headlessId - The ID of the AnswersHeadless instance
   * @param headlessReducerManager - The mananger of the Reducers for the AnswersHeadless
   *                                 instances
   */
  constructor(
    private store: EnhancedStore<ParentState, ActionWithHeadlessId>,
    private headlessId: string,
    headlessReducerManager: HeadlessReducerManager
  ) {
    headlessReducerManager.addAnswersReducer(this.headlessId);
    store.replaceReducer(headlessReducerManager.getParentReducer());
  }

  /**
   * Gets the state for the specific instance of AnswersHeadless.
   *
   * @returns The current state from the store
   */
  getState(): State {
    const state = this.store.getState();
    return state[this.headlessId];
  }

  /**
   * For actions other than set-state, the action type is given a prefix to designate
   * which AnswersHeadless instance it should affect.
   *
   * @param type - The type of action to dispatch
   * @param payload - The payload of the action
   */
  dispatchEvent(type: string, payload?: unknown): void {
    const answersActionType = type === 'set-state' ? 'set-state' : this.headlessId + '/' + type;
    this.store.dispatch({
      type: answersActionType,
      payload,
      headlessId: this.headlessId
    });
  }

  /**
   * Adds a listener for a specific state value of type T that triggers the callback
   * function only when the value changes.
   *
   * @param listener - The state listener to add
   * @returns The function for removing the added listener
   */
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