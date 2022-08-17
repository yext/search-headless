import { Reducer } from '@reduxjs/toolkit';
import { ParentState } from './models/state';
import { ActionWithHeadlessId } from './store';
/**
 * Manages the current map of headless IDs to Reducers.
 */
export default class HeadlessReducerManager {
    private headlessIdToReducer;
    addAnswersReducer(headlessId: string): void;
    getParentReducer(): Reducer<ParentState, ActionWithHeadlessId>;
}
//# sourceMappingURL=headless-reducer-manager.d.ts.map