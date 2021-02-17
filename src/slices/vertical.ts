import { createSlice } from '@reduxjs/toolkit';

export const verticalSlice = createSlice({
  name: 'vertical',
  initialState: {
    verticalKey: null,
    verticalResults: null,
    facets: null
  },
  reducers: {
    setKey: (state, action) => {
      state.verticalKey = action.payload.verticalKey;
    },
    setResults: (state, action) => {
      state.verticalResults = action.payload.results;
      state.facets = action.payload.results.facets;
    }
  }
});

export const { setKey, setResults } = verticalSlice.actions;
export default verticalSlice.reducer;