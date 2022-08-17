"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {};
const reducers = {
    setVerticals: (state, action) => {
        state.verticals = action.payload;
    },
    setLimit: (state, action) => {
        state.limit = action.payload;
    },
    setRestrictVerticals: (state, action) => {
        state.restrictVerticals = action.payload;
    }
};
/**
 * Registers with Redux the slice of {@link State} pertaining to universal search. There
 * are reducers for setting the limit and verticals to search and the universal results.
 */
function createUniversalSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'universal',
        initialState: exports.initialState,
        reducers
    });
}
exports.default = createUniversalSlice;
//# sourceMappingURL=universal.js.map