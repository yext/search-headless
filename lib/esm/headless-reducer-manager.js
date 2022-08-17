import { combineReducers } from '@reduxjs/toolkit';
import createQuerySlice from './slices/query';
import createVerticalSlice from './slices/vertical';
import createUniversalSlice from './slices/universal';
import createFiltersSlice from './slices/filters';
import createSpellCheckSlice from './slices/spellcheck';
import createSessionTrackingSlice from './slices/sessiontracking';
import createMetaSlice from './slices/meta';
import createLocationSlice from './slices/location';
import createDirectAnswerSlice from './slices/directanswer';
import createSearchStatusSlice from './slices/searchstatus';
import createQueryRulesSlice from './slices/queryrules';
/**
 * Manages the current map of headless IDs to Reducers.
 */
export default class HeadlessReducerManager {
    constructor() {
        this.headlessIdToReducer = {};
    }
    addAnswersReducer(headlessId) {
        this.headlessIdToReducer[headlessId] = createAnswersReducer(headlessId + '/');
    }
    getParentReducer() {
        // set-state should only update the state tree for the AnswersHeadless instance
        // that dispatched it
        const coreReducer = combineReducers(this.headlessIdToReducer);
        return (state, action) => {
            if (action.type === 'set-state') {
                return Object.assign(Object.assign({}, state), { [action.headlessId]: action.payload });
            }
            else {
                return coreReducer(state, action);
            }
        };
    }
}
function createAnswersReducer(prefix) {
    return combineReducers({
        query: createQuerySlice(prefix).reducer,
        vertical: createVerticalSlice(prefix).reducer,
        universal: createUniversalSlice(prefix).reducer,
        directAnswer: createDirectAnswerSlice(prefix).reducer,
        queryRules: createQueryRulesSlice(prefix).reducer,
        filters: createFiltersSlice(prefix).reducer,
        spellCheck: createSpellCheckSlice(prefix).reducer,
        sessionTracking: createSessionTrackingSlice(prefix).reducer,
        searchStatus: createSearchStatusSlice(prefix).reducer,
        meta: createMetaSlice(prefix).reducer,
        location: createLocationSlice(prefix).reducer
    });
}
//# sourceMappingURL=headless-reducer-manager.js.map