import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CombinedFilter, Filter } from '@yext/answers-core';
import { FiltersState } from '../types/filters';

const initialState: FiltersState = {};
export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatic: (state: FiltersState, action: PayloadAction<Filter|CombinedFilter>) => {
      state.static = action.payload;
    },
  }
});

export default filtersSlice.reducer;