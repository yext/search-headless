import { createSlice } from '@reduxjs/toolkit';

export const universalSlice = createSlice({
  name: 'universal',
  initialState: {
    universalResults: null,
  },
  reducers: {
    setResults: (state, action) => {
      state.universalResults = action.payload.results;
    }
  }
});

export const { setResults } = universalSlice.actions;
export default universalSlice.reducer;