import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { UniversalLimit, VerticalResults } from '@yext/search-core';
import { UniversalSearchState } from '../models/slices/universal';

export const initialState: UniversalSearchState = {};

const reducers = {
  setVerticals: (state: UniversalSearchState, action: PayloadAction<VerticalResults[]>) => {
    state.verticals = action.payload;
  },
  setLimit: (state: UniversalSearchState, action: PayloadAction<UniversalLimit>) => {
    state.limit = action.payload;
  },
  setRestrictVerticals: (state: UniversalSearchState, action: PayloadAction<string[]>) => {
    state.restrictVerticals = action.payload;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to universal search. There
 * are reducers for setting the limit and verticals to search and the universal results.
 */
export default function createUniversalSlice(prefix: string): Slice<UniversalSearchState, typeof reducers> {
  return createSlice({
    name: prefix + 'universal',
    initialState,
    reducers
  });
}
