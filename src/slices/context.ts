import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Context } from '@yext/answers-core';
import { ContextState } from '../models/slices/context';

const initialState: ContextState = {};

/**
 * Registers with Redux the slice of {@link State} pertaining to queries. There
 * are reducers for setting the query string, trigger, source, and id.
 */
export const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Context>) => {
      state.value = action.payload;
    }
  }
});

export const { set } = contextSlice.actions;
export default contextSlice.reducer;