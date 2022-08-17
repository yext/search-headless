import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/answers-core';
import { DirectAnswerState } from '../models/slices/directanswer';
export declare const initialState: DirectAnswerState;
declare const reducers: {
    setResult: (state: DirectAnswerState, action: PayloadAction<FeaturedSnippetDirectAnswer | FieldValueDirectAnswer | undefined>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to direct answers.
 */
export default function createDirectAnswerSlice(prefix: string): Slice<DirectAnswerState, typeof reducers>;
export {};
//# sourceMappingURL=directanswer.d.ts.map