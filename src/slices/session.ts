import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionTrackingState } from '../models/slices/session';

const initialState: SessionTrackingState = {
  trackingEnabled: false
};

/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of an answers experience.
 */
export const sessionTrackingSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setTrackingEnabled: (state, action: PayloadAction<boolean>) => {
      state.trackingEnabled = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
  }
});

export const { setSessionId, setTrackingEnabled } = sessionTrackingSlice.actions;
export default sessionTrackingSlice.reducer;
