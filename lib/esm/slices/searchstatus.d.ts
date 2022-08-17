import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { SearchStatusState } from '../models/slices/searchstatus';
export declare const initialState: SearchStatusState;
declare const reducers: {
    setIsLoading: (state: any, action: PayloadAction<boolean>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to the loading status
 * of Answers Headless.
 */
export default function createSearchStatusSlice(prefix: string): Slice<SearchStatusState, typeof reducers>;
export {};
//# sourceMappingURL=searchstatus.d.ts.map