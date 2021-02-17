import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'static-filters',
  initialState: {
    filters: null,
  },
  reducers: {
    set: (state, action) => {
      state.filters = action.payload.filters;
    },
  }
});

export const { set } = filtersSlice.actions;
export default filtersSlice.reducer;