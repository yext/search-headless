import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { SessionTrackingState } from '../models/slices/sessiontracking';

const initialState: SessionTrackingState = {
  enabled: true
};

const reducers = {
  setEnabled: (state, action: PayloadAction<boolean>) => {
    state.enabled = action.payload;
  },
  setSessionId: (state, action: PayloadAction<string>) => {
    state.sessionId = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to session tracking of
 * a Search experience.
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
