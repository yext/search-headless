import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/search-core';
import { DirectAnswerState } from '../models/slices/directanswer';

export const initialState: DirectAnswerState = {};

const reducers = {
  setResult: (
    state: DirectAnswerState,
    action: PayloadAction<FeaturedSnippetDirectAnswer | FieldValueDirectAnswer | undefined>
  ) => {
    state.result = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to direct answers.
 */
export default function createDirectAnswerSlice(prefix: string): Slice<DirectAnswerState, typeof reducers> {
  return createSlice({
    name: prefix + 'directAnswer',
    initialState,
    reducers
  });
}
