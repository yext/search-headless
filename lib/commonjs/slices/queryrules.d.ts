import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { QueryRulesActionsData } from '@yext/answers-core';
import { QueryRulesState } from '../models/slices/queryrules';
export declare const initialState: QueryRulesState;
declare const reducers: {
    setActions: (state: any, action: PayloadAction<QueryRulesActionsData[]>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to the triggered
 * query rules.
 */
export default function createQueryRulesSlice(prefix: string): Slice<QueryRulesState, typeof reducers>;
export {};
//# sourceMappingURL=queryrules.d.ts.map