"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    enabled: false
};
const reducers = {
    setEnabled: (state, action) => {
        state.enabled = action.payload;
    },
    setSessionId: (state, action) => {
        state.sessionId = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of
 * an Answers experience.
 */
function createSessionTrackingSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'sessionTracking',
        initialState,
        reducers
    });
}
exports.default = createSessionTrackingSlice;
//# sourceMappingURL=sessiontracking.js.map