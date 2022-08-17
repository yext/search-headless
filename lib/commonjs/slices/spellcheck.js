"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    enabled: true
};
const reducers = {
    setResult: (state, action) => {
        return Object.assign({ enabled: state.enabled }, action.payload);
    },
    setEnabled: (state, action) => {
        state.enabled = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to spellcheck.
 */
function createSpellCheckSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'spellCheck',
        initialState,
        reducers
    });
}
exports.default = createSpellCheckSlice;
//# sourceMappingURL=spellcheck.js.map