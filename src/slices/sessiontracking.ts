import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { SessionTrackingState } from '../models/slices/sessiontracking';

const initialState: SessionTrackingState = {
  enabled: false
};

const reducers = {
  setEnabled: (state: SessionTrackingState, action: PayloadAction<boolean>) => {
    state.enabled = action.payload;
  },
  setSessionId: (state: SessionTrackingState, action: PayloadAction<string>) => {
    state.sessionId = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of an answers experience.
 */
export default function createSessionTrackingSlice(
  prefix: string
): Slice<SessionTrackingState, typeof reducers> {
  return createSlice({
    name: prefix + 'sessionTracking',
    initialState,
    reducers
  });
}
