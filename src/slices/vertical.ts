import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerticalSearchResponse, AutocompleteResponse, VerticalResults } from '@yext/answers-core';
import { VerticalSearchState } from '../models/slices/vertical';

const initialState: VerticalSearchState = {
  numSearchesRunning: 0
};

/**
 * Registers with Redux the slice of {@link State} pertaining to vertical search. There
 * are reducers for setting the vertical key, results, and auto-complete.
 */
export const verticalSlice = createSlice({
  name: 'vertical',
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setResults: (state, action: PayloadAction<VerticalSearchResponse>) => {
      state.results = action.payload;
    },
    setAutoComplete: (state, action: PayloadAction<AutocompleteResponse>) => {
      state.autoComplete = action.payload;
    },
    setAlternativeVerticals: (state, action: PayloadAction<VerticalResults[]>) => {
      state.alternativeVerticals = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    incrementSearchCounter: (state) => {
      state.numSearchesRunning++;
      state.searchIsLoading = true;
    },
    decrementSearchCounter: (state) => {
      state.numSearchesRunning--;
      state.searchIsLoading = state.numSearchesRunning > 0;
    },
  }
});

export const {
  setKey,
  setResults,
  setAutoComplete,
  setLimit,
  setOffset,
  incrementSearchCounter,
  decrementSearchCounter
} = verticalSlice.actions;

export default verticalSlice.reducer;