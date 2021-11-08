import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';
import { QueryState } from '../models/slices/query';

const initialState: QueryState = {};

const reducers = {
  set: (state: QueryState, action: PayloadAction<string>) => {
    state.query = action.payload;
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
  setLatest: (state: QueryState, action: PayloadAction<string>) => {
    state.latest = action.payload;
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
