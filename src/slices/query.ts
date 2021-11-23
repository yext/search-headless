import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';
import { QueryState } from '../models/slices/query';
import { v4 as uuidv4 } from 'uuid';

const initialState: QueryState = {};

const reducers = {
  setInput: (state: QueryState, action: PayloadAction<string>) => {
    state.input = action.payload;
  },
  setTrigger: (state: QueryState, action: PayloadAction<QueryTrigger>) => {
    state.queryTrigger = action.payload;
  },
  setSource: (state: QueryState, action: PayloadAction<QuerySource>) => {
    state.querySource = action.payload;
  },
  setQueryId: (state: QueryState, action: PayloadAction<string>) => {
    state.queryId = action.payload;
  },
  setSearchAggregationEnabled: (state: QueryState, action: PayloadAction<boolean>) => {
    state.searchAggregation = { 
      enabled: action.payload,
      id: action.payload ? uuidv4() : undefined
    };
  },
  setSearchAggregationId: (state: QueryState, action: PayloadAction<string>) => {
    if (!state.searchAggregation) {
      console.error('Search aggregation is not enabled.');
      return;
    }
    state.searchAggregation.id = action.payload;
  },
  setMostRecentSearch: (state: QueryState, action: PayloadAction<string>) => {
    state.mostRecentSearch = action.payload;
  },
  setSearchIntents: (state: QueryState, action: PayloadAction<SearchIntent[]>) => {
    state.searchIntents = action.payload;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to queries. There
 * are reducers for setting the query string, trigger, source, and id.
 */
export default function createQuerySlice(prefix: string): Slice<QueryState, typeof reducers> {
  return createSlice({
    name: prefix + 'query',
    initialState,
    reducers
  });
}
