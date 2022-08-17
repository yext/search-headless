"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {};
const reducers = {
    setResult: (state, action) => {
        state.result = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to direct answers.
 */
function createDirectAnswerSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'directAnswer',
        initialState: exports.initialState,
        reducers
    });
}
exports.default = createDirectAnswerSlice;
//# sourceMappingURL=directanswer.js.map