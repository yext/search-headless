import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UniversalSearchResponse, AutocompleteResponse } from '@yext/answers-core';
import { UniversalSearchState } from '../models/slices/universal';

const initialState: UniversalSearchState = {};

export const universalSlice = createSlice({
  name: 'universal',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<UniversalSearchResponse>) => {
      state.results = action.payload;
    },
    setAutoComplete: (state, action: PayloadAction<AutocompleteResponse>) => {
      state.autoComplete = action.payload;
    }
  }
});

export default universalSlice.reducer;