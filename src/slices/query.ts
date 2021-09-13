import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';
import { QueryState } from '../models/slices/query';

const initialState: QueryState = {};

/**
 * Registers with Redux the slice of {@link State} pertaining to queries. There
 * are reducers for setting the query string, trigger, source, and id.
 */
export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setTrigger: (state, action: PayloadAction<QueryTrigger>) => {
      state.queryTrigger = action.payload;
    },
    setSource: (state, action: PayloadAction<QuerySource>) => {
      state.querySource = action.payload;
    },
    setQueryId: (state, action: PayloadAction<string>) => {
      state.queryId = action.payload;
    },
    setLatest: (state, action: PayloadAction<string>) => {
      state.latest = action.payload;
    },
    setSearchIntents: (state, action: PayloadAction<SearchIntent[]>) => {
      state.searchIntents = action.payload;
    }
  }
});

export const { set, setTrigger, setSource, setQueryId, setLatest, setSearchIntents } = querySlice.actions;
export default querySlice.reducer;