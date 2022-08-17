import { createSlice } from '@reduxjs/toolkit';
import { SearchTypeEnum } from '../models/utils/searchType';
const initialState = {
    searchType: SearchTypeEnum.Universal
};
const reducers = {
    setContext: (state, action) => {
        state.context = action.payload;
    },
    setReferrerPageUrl: (state, action) => {
        state.referrerPageUrl = action.payload;
    },
    setUUID: (state, action) => {
        state.uuid = action.payload;
    },
    setSearchType: (state, action) => {
        state.searchType = action.payload;
    }
};
/**
 * Registers with Redux the slice of {@link State} pertaining to meta attributes
 * like {@link Context} and referrerPageUrl.
 */
export default function createMetaSlice(prefix) {
    return createSlice({
        name: prefix + 'meta',
        initialState,
        reducers
    });
}
//# sourceMappingURL=meta.js.map