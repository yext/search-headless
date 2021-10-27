import { Reducer } from '@reduxjs/toolkit';

/**
 * Manages the reducers for {@link ChildStateManager}s.
 */
export default class ChildReducersManager {
  private childIdToReducers: Record<string, Reducer> = {};

  setReducer(prefix: string, reducer: Reducer): void {
    this.childIdToReducers[prefix] = reducer;
  }

  getReducers(): Record<string, Reducer> {
    return this.childIdToReducers;
  }
}