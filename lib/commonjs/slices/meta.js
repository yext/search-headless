"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const searchType_1 = require("../models/utils/searchType");
const initialState = {
    searchType: searchType_1.SearchTypeEnum.Universal
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
function createMetaSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'meta',
        initialState,
        reducers
    });
}
exports.default = createMetaSlice;
//# sourceMappingURL=meta.js.map