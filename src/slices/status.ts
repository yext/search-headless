import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { StatusState } from '../models/slices/status';

const initialState: StatusState = {};

const reducers = {
  setSearchLoading: (state, action: PayloadAction<boolean>) => {
    state.searchLoading = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to the status of Answers Headless
 */
export default function createStatusSlice(prefix: string): Slice<StatusState, typeof reducers> {
  return createSlice({
    name: prefix + 'status',
    initialState,
    reducers
  });
}
