import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    enabled: false
};
const reducers = {
    setEnabled: (state, action) => {
        state.enabled = action.payload;
    },
    setSessionId: (state, action) => {
        state.sessionId = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of
 * an Answers experience.
 */
export default function createSessionTrackingSlice(prefix) {
    return createSlice({
        name: prefix + 'sessionTracking',
        initialState,
        reducers
    });
}
//# sourceMappingURL=sessiontracking.js.map