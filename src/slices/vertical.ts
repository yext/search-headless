import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerticalSearchResponse, AutocompleteResponse, VerticalResults } from '@yext/answers-core';
import { VerticalSearchState } from '../models/slices/vertical';

const initialState: VerticalSearchState = {};

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
      state.facets = action.payload.facets;
    },
    setAutoComplete: (state, action: PayloadAction<AutocompleteResponse>) => {
      state.autoComplete = action.payload;
    },
    setAlternativeVerticals: (state, action: PayloadAction<VerticalResults[]>) => {
      state.alternativeVerticals = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    }
  }
});

export const { setKey, setResults, setAutoComplete } = verticalSlice.actions;
export default verticalSlice.reducer;