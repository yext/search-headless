import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Context } from '@yext/answers-core';
import { MetaState } from '../models/slices/meta';

const initialState: MetaState = {};

const reducers = {
  setContext: (state: MetaState, action: PayloadAction<Context>) => {
    state.context = action.payload;
  },
  setReferrerPageUrl: (state: MetaState, action: PayloadAction<string>) => {
    state.referrerPageUrl = action.payload;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to meta attributes
 * like {@link Context} and referrerPageUrl.
 */
export default function createMetaSlice(prefix: string): Slice<MetaState, typeof reducers> {
  return createSlice({
    name: prefix + 'meta',
    initialState,
    reducers
  });
}
