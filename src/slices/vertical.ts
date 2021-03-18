import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerticalSearchResponse, Facet, AutocompleteResponse } from '@yext/answers-core';

interface VerticalSearchState {
  key?: string,
  autoComplete?: AutocompleteResponse
  results?: VerticalSearchResponse,
  facets?: Facet[]
}

const initialState: VerticalSearchState = {};

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
    }
  }
});

export default verticalSlice.reducer;