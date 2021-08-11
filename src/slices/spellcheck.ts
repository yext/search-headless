import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpellCheck } from '@yext/answers-core';
import { SpellCheckState } from '../models/slices/spellcheck';

const initialState: SpellCheckState = {
  enabled: true
};

/**
 * Registers with Redux the slice of {@link State} pertaining to spellcheck.
 */
export const spellCheckSlice = createSlice({
  name: 'spellCheck',
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<SpellCheck>) => {
      return {
        enabled: state.enabled,
        ...action.payload
      };
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
  }
});

export const { setResult, setEnabled } = spellCheckSlice.actions;
export default spellCheckSlice.reducer;