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
    private store;
    private headlessId;
    constructor(store: EnhancedStore<ParentState, ActionWithHeadlessId>, headlessId: string, headlessReducerManager: HeadlessReducerManager);
    getState(): State;
    dispatchEvent(type: string, payload?: unknown): void;
    addListener<T>(listener: StateListener<T>): Unsubscribe;
}
//# sourceMappingURL=redux-state-manager.d.ts.map