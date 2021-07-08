import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CombinedFilter, Filter } from '@yext/answers-core';
import { FiltersState } from '../models/slices/filters';

const initialState: FiltersState = {};

/**
 * Registers with Redux the slice of {@link State} pertaining to filters. There
 * are reducers for setting the static filters.
 */
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