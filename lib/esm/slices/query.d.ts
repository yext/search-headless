import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';
import { QueryState } from '../models/slices/query';
declare const reducers: {
    setInput: (state: any, action: PayloadAction<string>) => void;
    setTrigger: (state: any, action: PayloadAction<QueryTrigger>) => void;
    setSource: (state: any, action: PayloadAction<QuerySource>) => void;
    setQueryId: (state: any, action: PayloadAction<string>) => void;
    setMostRecentSearch: (state: any, action: PayloadAction<string>) => void;
    setSearchIntents: (state: any, action: PayloadAction<SearchIntent[]>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to queries. There are
 * reducers for setting query data like the query string, trigger, source, and id.
 */
export default function createQuerySlice(prefix: string): Slice<QueryState, typeof reducers>;
export {};
//# sourceMappingURL=query.d.ts.map