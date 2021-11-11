import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import {
  SortBy,
  VerticalSearchResponse
} from '@yext/answers-core';
import { AllResultsForVertical, VerticalSearchState } from '../models/slices/vertical';

const initialState: VerticalSearchState = {};

const reducers = {
  handleSearchResponse: (
    state: VerticalSearchState,
    action: PayloadAction<VerticalSearchResponse>
  ) => {
    if (action.payload.allResultsForVertical && action.payload.alternativeVerticals) {
      const allResultsForVertical: AllResultsForVertical = {
        facets: action.payload.allResultsForVertical.facets || [],
        results: action.payload.allResultsForVertical.verticalResults?.results,
        resultsCount: action.payload.allResultsForVertical.verticalResults?.resultsCount,
        searchIntents: action.payload.allResultsForVertical.searchIntents || []
      };
      state.noResults = {
        allResultsForVertical,
        alternativeVerticals: action.payload.alternativeVerticals
      };
    } else {
      state.noResults = undefined;
    }
    state.appliedQueryFilters = action.payload.verticalResults?.appliedQueryFilters;
    state.queryDurationMillis = action.payload.verticalResults?.queryDurationMillis;
    state.results = action.payload.verticalResults?.results;
    state.resultsCount = action.payload.verticalResults?.resultsCount;
    state.source = action.payload.verticalResults?.source;
  },
  setDisplayName: (state: VerticalSearchState, action: PayloadAction<string>) => {
    state.displayName = action.payload;
  },
  setLimit: (state: VerticalSearchState, action: PayloadAction<number>) => {
    state.limit = action.payload;
  },
  setOffset: (state: VerticalSearchState, action: PayloadAction<number>) => {
    state.offset = action.payload;
  },
  setSortBys: (state: VerticalSearchState, action: PayloadAction<SortBy[]>) => {
    state.sortBys = action.payload;
  },
  setVerticalKey: (state: VerticalSearchState, action: PayloadAction<string>) => {
    state.verticalKey = action.payload;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to vertical search. There
 * are reducers for setting the vertical key, results, and auto-complete.
 */
export default function createVerticalSlice(prefix: string): Slice<VerticalSearchState, typeof reducers> {
  return createSlice({
    name: prefix + 'vertical',
    initialState,
    reducers
  });
}
