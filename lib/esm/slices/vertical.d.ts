import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { SortBy, VerticalSearchResponse } from '@yext/answers-core';
import { VerticalSearchState } from '../models/slices/vertical';
export declare const initialState: VerticalSearchState;
declare const reducers: {
    handleSearchResponse: (state: VerticalSearchState, action: PayloadAction<VerticalSearchResponse>) => void;
    setDisplayName: (state: VerticalSearchState, action: PayloadAction<string>) => void;
    setLimit: (state: VerticalSearchState, action: PayloadAction<number>) => void;
    setOffset: (state: VerticalSearchState, action: PayloadAction<number>) => void;
    setSortBys: (state: VerticalSearchState, action: PayloadAction<SortBy[]>) => void;
    setVerticalKey: (state: VerticalSearchState, action: PayloadAction<string | undefined>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to vertical search. There
 * are reducers for setting the vertical key, search request data, and
 * results.
 */
export default function createVerticalSlice(prefix: string): Slice<VerticalSearchState, typeof reducers>;
export {};
//# sourceMappingURL=vertical.d.ts.map