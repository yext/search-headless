import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Context } from '@yext/answers-core';
import { MetaState } from '../models/slices/meta';

const initialState: MetaState = {};

/**
 * Registers with Redux the slice of {@link State} pertaining to meta attributes
 * like {@link Context} and referrerPageUrl.
 */
export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setContext: (state, action: PayloadAction<Context>) => {
      state.context = action.payload;
    },
    setReferrerPageUrl: (state, action: PayloadAction<string>) => {
      state.referrerPageUrl = action.payload;
    }
  }
});

export const { setContext, setReferrerPageUrl } = metaSlice.actions;
export default metaSlice.reducer;