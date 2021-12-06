import { Unsubscribe } from '@reduxjs/toolkit';
import { State } from './state';
import StateListener from './state-listener';

/**
 * An interface for managing the state.
 */
export default interface StateManager {
  /**
   * Returns the current state.
   */
  getState(): State;
  /**
   * Dispatches an event.
   * 
   * @param type - The type of action to dispatch
   * @param payload - The payload of the action to dispatch
   */
  dispatchEvent(type: string, payload?: unknown): void;
  /**
   * Adds a listener for a state value.
   * 
   * @param listener - State listener to add
   */
  addListener<T>(listener: StateListener<T>): Unsubscribe;
}