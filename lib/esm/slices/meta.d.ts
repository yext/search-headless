import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { Context } from '@yext/answers-core';
import { MetaState } from '../models/slices/meta';
declare const reducers: {
    setContext: (state: any, action: PayloadAction<Context>) => void;
    setReferrerPageUrl: (state: any, action: PayloadAction<string>) => void;
    setUUID: (state: any, action: PayloadAction<string>) => void;
    setSearchType: (state: any, action: PayloadAction<string>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to meta attributes
 * like {@link Context} and referrerPageUrl.
 */
export default function createMetaSlice(prefix: string): Slice<MetaState, typeof reducers>;
export {};
//# sourceMappingURL=meta.d.ts.map