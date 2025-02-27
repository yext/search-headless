import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Context } from '@yext/search-core';
import { MetaState } from '../models/slices/meta';
import { SearchTypeEnum } from '../models/utils/searchType';

const initialState: MetaState = {
  searchType: SearchTypeEnum.Universal
};

const reducers = {
  setContext: (state, action: PayloadAction<Context>) => {
    state.context = action.payload;
  },
  setReferrerPageUrl: (state, action: PayloadAction<string>) => {
    state.referrerPageUrl = action.payload;
  },
  setUUID: (state, action: PayloadAction<string>) => {
    state.uuid = action.payload;
  },
  setSearchType: (state, action: PayloadAction<string>) => {
    state.searchType = action.payload;
  },
  setExperienceKey: (state, action: PayloadAction<string>) => {
    state.experienceKey = action.payload;
  },
  setLocale: (state, action: PayloadAction<string>) => {
    state.locale = action.payload;
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
