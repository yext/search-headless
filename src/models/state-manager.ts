import { Unsubscribe } from '@reduxjs/toolkit';
import { State } from './state';
import StateListener from './state-listener';

export default interface StateManager {
  getState(): State;
  dispatchEvent(type: string, payload?: unknown): void;
  addListener<T>(listener: StateListener<T>): Unsubscribe;
}