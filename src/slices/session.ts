import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from '../models/slices/session';

const initialState: SessionState = {
  trackingEnabled: false
};

/**
 * Registers with Redux the slice of {@link State} pertaining to an answers experience's session.
 */
export const sessionSlice = createSlice({
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

export const { setSessionId, setTrackingEnabled } = sessionSlice.actions;
export default sessionSlice.reducer;
