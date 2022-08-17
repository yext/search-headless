import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { UniversalLimit, VerticalResults } from '@yext/answers-core';
import { UniversalSearchState } from '../models/slices/universal';
export declare const initialState: UniversalSearchState;
declare const reducers: {
    setVerticals: (state: UniversalSearchState, action: PayloadAction<VerticalResults[]>) => void;
    setLimit: (state: UniversalSearchState, action: PayloadAction<UniversalLimit>) => void;
    setRestrictVerticals: (state: UniversalSearchState, action: PayloadAction<string[]>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to universal search. There
 * are reducers for setting the limit and verticals to search and the universal results.
 */
export default function createUniversalSlice(prefix: string): Slice<UniversalSearchState, typeof reducers>;
export {};
//# sourceMappingURL=universal.d.ts.map