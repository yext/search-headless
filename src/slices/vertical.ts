import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerticalSearchResponse, Facet } from '@yext/answers-core';

interface VerticalSearchState {
  key?: string,
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
    }
  }
});

export default verticalSlice.reducer;