import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { SpellCheck } from '@yext/answers-core';
import { SpellCheckState } from '../models/slices/spellcheck';

const initialState: SpellCheckState = {
  enabled: true
};

const reducers = {
  setResult: (state, action: PayloadAction<SpellCheck>) => {
    return {
      enabled: state.enabled,
      ...action.payload
    };
  },
  setEnabled: (state, action: PayloadAction<boolean>) => {
    state.enabled = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to spellcheck.
 *
 * @param prefix - The prefix to access the part of the Redux store specific to the
 *                 AnswersHeadless instance
 * @returns The {@link Slice} for spellcheck
 */
export default function createSpellCheckSlice(prefix: string): Slice<SpellCheckState, typeof reducers> {
  return createSlice({
    name: prefix + 'spellCheck',
    initialState,
    reducers
  });
}
