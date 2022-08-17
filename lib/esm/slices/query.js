import { createSlice } from '@reduxjs/toolkit';
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
export default function createQuerySlice(prefix) {
    return createSlice({
        name: prefix + 'query',
        initialState,
        reducers
    });
}
//# sourceMappingURL=query.js.map