import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { SearchStatusState } from '../models/slices/searchstatus';

const initialState: SearchStatusState = {};

const reducers = {
  setIsLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to the loading status
 * of Answers Headless.
 *
 * @param prefix - The prefix for the AnswersHeadless instance
 * @returns The {@link Slice} for the search loading status
 */
export default function createSearchStatusSlice(prefix: string): Slice<SearchStatusState, typeof reducers> {
  return createSlice({
    name: prefix + 'searchStatus',
    initialState,
    reducers
  });
}
