import { createSlice } from '@reduxjs/toolkit';

export const querySlice = createSlice({
  name: 'query',
  initialState: {
    query: ''
  },
  reducers: {
    set: (state, action) => {
      state.query = action.payload.query;
    }
  }
});

export const { set } = querySlice.actions;
export default querySlice.reducer;