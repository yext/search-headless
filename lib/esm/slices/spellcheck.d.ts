import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { SpellCheck } from '@yext/answers-core';
import { SpellCheckState } from '../models/slices/spellcheck';
declare const reducers: {
    setResult: (state: any, action: PayloadAction<SpellCheck>) => {
        originalQuery: string;
        correctedQuery: string;
        type: import("@yext/answers-core").SpellCheckType;
        enabled: any;
    };
    setEnabled: (state: any, action: PayloadAction<boolean>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to spellcheck.
 */
export default function createSpellCheckSlice(prefix: string): Slice<SpellCheckState, typeof reducers>;
export {};
//# sourceMappingURL=spellcheck.d.ts.map