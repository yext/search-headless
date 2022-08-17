import { createSlice } from '@reduxjs/toolkit';
export const initialState = {};
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
export default function createUniversalSlice(prefix) {
    return createSlice({
        name: prefix + 'universal',
        initialState,
        reducers
    });
}
//# sourceMappingURL=universal.js.map