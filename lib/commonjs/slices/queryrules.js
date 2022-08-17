"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = { actions: [] };
const reducers = {
    setActions: (state, action) => {
        state.actions = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to the triggered
 * query rules.
 */
function createQueryRulesSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'queryRules',
        initialState: exports.initialState,
        reducers
    });
}
exports.default = createQueryRulesSlice;
//# sourceMappingURL=queryrules.js.map