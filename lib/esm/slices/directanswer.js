import { createSlice } from '@reduxjs/toolkit';
export const initialState = {};
const reducers = {
    setResult: (state, action) => {
        state.result = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to direct answers.
 */
export default function createDirectAnswerSlice(prefix) {
    return createSlice({
        name: prefix + 'directAnswer',
        initialState,
        reducers
    });
}
//# sourceMappingURL=directanswer.js.map