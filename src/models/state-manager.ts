import { State } from './state';
import StateListener from './state-listener';

export default interface StateManager {
  getState(): State;
  dispatchEvent(type: string, payload: any): void;
  addListener<T>(listener: StateListener<T>): void;
}