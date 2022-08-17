"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {};
const reducers = {
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to the loading status
 * of Answers Headless.
 */
function createSearchStatusSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'searchStatus',
        initialState: exports.initialState,
        reducers
    });
}
exports.default = createSearchStatusSlice;
//# sourceMappingURL=searchstatus.js.map