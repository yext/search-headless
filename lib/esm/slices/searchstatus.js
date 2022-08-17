import { createSlice } from '@reduxjs/toolkit';
export const initialState = {};
const reducers = {
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to the loading status
 * of Answers Headless.
 */
export default function createSearchStatusSlice(prefix) {
    return createSlice({
        name: prefix + 'searchStatus',
        initialState,
        reducers
    });
}
//# sourceMappingURL=searchstatus.js.map