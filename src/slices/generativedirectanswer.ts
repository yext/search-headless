import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { GenerativeDirectAnswerResponse } from '@yext/search-core';
import { GenerativeDirectAnswerState } from '../models/slices/generativedirectanswer';

export const initialState: GenerativeDirectAnswerState = {};

const reducers = {
  setIsLoading: (state: GenerativeDirectAnswerState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setResponse: (
    state: GenerativeDirectAnswerState,
    action: PayloadAction<GenerativeDirectAnswerResponse>
  ) => {
    state.response = action.payload;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to generative direct answer.
 */
export default function createGenerativeDirectAnswerSlice(
  prefix: string
): Slice<GenerativeDirectAnswerState, typeof reducers> {
  return createSlice({
    name: prefix + 'generativeDirectAnswer',
    initialState,
    reducers
  });
}
