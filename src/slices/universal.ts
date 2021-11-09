import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { AutocompleteResponse, UniversalLimit, VerticalResults } from '@yext/answers-core';
import { UniversalSearchState } from '../models/slices/universal';

const initialState: UniversalSearchState = {};

const reducers = {
  setVerticals: (state, action: PayloadAction<VerticalResults[]>) => {
    state.verticals = action.payload;
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
export default function createUniversalSlice(prefix: string): Slice<UniversalSearchState, typeof reducers> {
  return createSlice({
    name: prefix + 'universal',
    initialState,
    reducers
  });
}
