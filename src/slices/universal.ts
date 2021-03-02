import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UniversalSearchResponse } from '@yext/answers-core';

interface UniversalSearchState {
  results?: UniversalSearchResponse
}

const initialState: UniversalSearchState = {};

export const universalSlice = createSlice({
  name: 'universal',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<UniversalSearchResponse>) => {
      state.results = action.payload;
    }
  }
});

export default universalSlice.reducer;