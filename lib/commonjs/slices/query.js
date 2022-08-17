"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {};
const reducers = {
    setInput: (state, action) => {
        state.input = action.payload;
    },
    setTrigger: (state, action) => {
        state.queryTrigger = action.payload;
    },
    setSource: (state, action) => {
        state.querySource = action.payload;
    },
    setQueryId: (state, action) => {
        state.queryId = action.payload;
    },
    setMostRecentSearch: (state, action) => {
        state.mostRecentSearch = action.payload;
    },
    setSearchIntents: (state, action) => {
        state.searchIntents = action.payload;
    }
};
/**
 * Registers with Redux the slice of {@link State} pertaining to queries. There are
 * reducers for setting query data like the query string, trigger, source, and id.
 */
function createQuerySlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'query',
        initialState,
        reducers
    });
}
exports.default = createQuerySlice;
//# sourceMappingURL=query.js.map