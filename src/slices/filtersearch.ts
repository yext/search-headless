import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { FilterSearchResponse } from '@yext/answers-core';
import { FilterSearchStates } from '../models/slices/filtersearch';

const initialState: FilterSearchStates = {};

const reducers = {
  setQuery: (
    state: FilterSearchStates,
    action: PayloadAction<{ query: string, filterSearchId: string }>
  ) => {
    const { filterSearchId, query } = action.payload;
    if (!filterSearchId) {
      console.warn(`invalid filterSearch id: "${filterSearchId}". Id must be a non-empty string.`);
      return;
    }
    state[filterSearchId]
      ? state[filterSearchId].query = query
      : state[filterSearchId] = { query };
  },
  setResults: (
    state: FilterSearchStates,
    action: PayloadAction<{ filterSearchId: string, results: FilterSearchResponse }>
  ) => {
    const { filterSearchId, results } = action.payload;
    state[filterSearchId].results = results;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to filter search. There
 * are reducers for setting the query and results of the filterSearch.
 */
export default function createFilterSearchSlice(prefix: string): Slice<FilterSearchStates, typeof reducers> {
  return createSlice({
    name: prefix + 'filterSearch',
    initialState,
    reducers
  });
}
