import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import {
  AutocompleteResponse,
  SortBy,
  VerticalSearchResponse
} from '@yext/answers-core';
import { VerticalSearchState } from '../models/slices/vertical';

const initialState: VerticalSearchState = {};

const reducers = {
  handleSearchResponse: (state, action: PayloadAction<VerticalSearchResponse | undefined>) => {
    const isNoResultsData = action.payload?.allResultsForVertical ?? action.payload?.alternativeVerticals;
    const allResultsForVertical = action.payload?.allResultsForVertical ? {
      facets: action.payload.allResultsForVertical.facets,
      results: action.payload.allResultsForVertical.verticalResults?.results,
      resultsCount: action.payload.allResultsForVertical.verticalResults?.resultsCount,
      searchIntents: action.payload.allResultsForVertical.searchIntents
    } : undefined;
    state.noResults = isNoResultsData ? {
      allResultsForVertical,
      alternativeVerticals: action.payload?.alternativeVerticals
    } : undefined;
    state.appliedQueryFilters = action.payload?.verticalResults?.appliedQueryFilters;
    state.queryDurationMillis = action.payload?.verticalResults?.queryDurationMillis;
    state.results = action.payload?.verticalResults?.results;
    state.resultsCount = action.payload?.verticalResults?.resultsCount;
    state.source = action.payload?.verticalResults?.source;
  },
  setAutoComplete: (state, action: PayloadAction<AutocompleteResponse>) => {
    state.autoComplete = action.payload;
  },
  setDisplayName: (state, action: PayloadAction<string>) => {
    state.displayName = action.payload;
  },
  setLimit: (state, action: PayloadAction<number>) => {
    state.limit = action.payload;
  },
  setOffset: (state, action: PayloadAction<number>) => {
    state.offset = action.payload;
  },
  setSearchLoading: (state, action: PayloadAction<boolean>) => {
    state.searchLoading = action.payload;
  },
  setSortBys: (state, action: PayloadAction<SortBy[]>) => {
    state.sortBys = action.payload;
  },
  setVerticalKey: (state, action: PayloadAction<string>) => {
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
