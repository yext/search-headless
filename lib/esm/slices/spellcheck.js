import { createSlice } from '@reduxjs/toolkit';
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
export default function createSpellCheckSlice(prefix) {
    return createSlice({
        name: prefix + 'spellCheck',
        initialState,
        reducers
    });
}
//# sourceMappingURL=spellcheck.js.map