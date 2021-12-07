import { State } from './state';

/**
 * Represents a listener for a value of type T in the state.
 */
export default interface StateListener<T> {
  /**
   * Accesses a value of type T in the state.
   * 
   * @param state - The current state
   * @returns The value of type T from the state
   */
  valueAccessor(state: State): T;
  /**
   * The function to call when the state value updates.
   * 
   * @param currentValue - The current state value
   */
  callback(currentValue: T);
}