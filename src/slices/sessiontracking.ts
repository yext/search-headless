import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionTrackingState } from '../models/slices/sessiontracking';

const initialState: SessionTrackingState = {
  enabled: false
};

/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of an answers experience.
 */
export const sessionTrackingSlice = createSlice({
  name: 'sessionTracking',
  initialState,
  reducers: {
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
  }
});

export const { setSessionId, setEnabled } = sessionTrackingSlice.actions;
export default sessionTrackingSlice.reducer;
