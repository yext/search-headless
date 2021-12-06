import { State } from './state';

/**
 * An interface for a state listener.
 */
export default interface StateListener<T> {
  /**
   * Accesses a value in the state.
   * @param state - The current state
   */
  valueAccessor(state: State): T;
  /**
   * The function to call when the state value updates.
   * @param currentValue - The current state value
   */
  callback(currentValue: T);
}