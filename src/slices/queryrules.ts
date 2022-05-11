import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { QueryRulesActionsData } from '@yext/answers-core';
import { QueryRulesState } from '../models/slices/queryrules';

export const initialState: QueryRulesState = { actions: [] };

const reducers = {
  setActions: (state, action: PayloadAction<QueryRulesActionsData[]>) => {
    state.actions = action.payload;
  },
};

/**
 * Registers with Redux the slice of {@link State} pertaining to the triggered
 * query rules.
 */
export default function createQueryRulesSlice(prefix: string): Slice<QueryRulesState, typeof reducers> {
  return createSlice({
    name: prefix + 'queryRules',
    initialState,
    reducers
  });
}
