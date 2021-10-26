import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { UniversalSearchResponse, AutocompleteResponse, UniversalLimit } from '@yext/answers-core';
import { UniversalSearchState } from '../models/slices/universal';

const initialState: UniversalSearchState = {};

const reducers = {
  setResults: (state, action: PayloadAction<UniversalSearchResponse>) => {
    state.results = action.payload;
  },
  setAutoComplete: (state, action: PayloadAction<AutocompleteResponse>) => {
    state.autoComplete = action.payload;
  },
  setSearchLoading: (state, action: PayloadAction<boolean>) => {
    state.searchLoading = action.payload;
  },
  setLimit: (state, action: PayloadAction<UniversalLimit>) => {
    state.limit = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to universal search. There
 * are reducers for setting the universal results and auto-complete.
 */
export default function createUniversalSlice(prefix = ''): Slice<UniversalSearchState, typeof reducers> {
  return createSlice({
    name: prefix + 'universal',
    initialState,
    reducers
  });
}
