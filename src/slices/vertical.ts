import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import {
  AppliedQueryFilter,
  AutocompleteResponse,
  Result,
  SortBy,
  Source,
  VerticalResults,
  VerticalSearchResponse
} from '@yext/answers-core';
import { VerticalSearchState } from '../models/slices/vertical';

const initialState: VerticalSearchState = {};

const reducers = {
  setAllResultsForVertical: (state, action: PayloadAction<VerticalSearchResponse | undefined>) => {
    if (action.payload === undefined) {
      state.allResults = undefined;
      return;
    }
    state.allResultsForVertical = {
      facets: action.payload.facets,
      results: action.payload.verticalResults?.results,
      resultsCount: action.payload.verticalResults?.resultsCount,
      searchIntents: action.payload.searchIntents
    };
  },
  setAlternativeVerticals: (state, action: PayloadAction<VerticalResults[]>) => {
    state.alternativeVerticals = action.payload;
  },
  setAppliedQueryFilters: (state, action: PayloadAction<AppliedQueryFilter[]>) => {
    state.appliedQueryFilters = action.payload;
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
  setQueryDurationMillis: (state, action: PayloadAction<number>) => {
    state.queryDurationMillis = action.payload;
  },
  setResults: (state, action: PayloadAction<Result[]>) => {
    state.results = action.payload;
  },
  setResultsCount: (state, action: PayloadAction<number>) => {
    state.resultsCount = action.payload;
  },
  setSearchLoading: (state, action: PayloadAction<boolean>) => {
    state.searchLoading = action.payload;
  },
  setSortBys: (state, action: PayloadAction<SortBy[]>) => {
    state.sortBys = action.payload;
  },
  setSource: (state, action: PayloadAction<Source>) => {
    state.source = action.payload;
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
