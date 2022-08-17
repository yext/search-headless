"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.initialState = {};
const reducers = {
    handleSearchResponse: (state, action) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (((_a = action.payload) === null || _a === void 0 ? void 0 : _a.allResultsForVertical) && ((_b = action.payload) === null || _b === void 0 ? void 0 : _b.alternativeVerticals)) {
            const allResultsForVertical = {
                facets: action.payload.allResultsForVertical.facets || [],
                results: (_c = action.payload.allResultsForVertical.verticalResults) === null || _c === void 0 ? void 0 : _c.results,
                resultsCount: (_d = action.payload.allResultsForVertical.verticalResults) === null || _d === void 0 ? void 0 : _d.resultsCount
            };
            state.noResults = {
                allResultsForVertical,
                alternativeVerticals: action.payload.alternativeVerticals
            };
        }
        else {
            state.noResults = undefined;
        }
        state.appliedQueryFilters = (_f = (_e = action.payload) === null || _e === void 0 ? void 0 : _e.verticalResults) === null || _f === void 0 ? void 0 : _f.appliedQueryFilters;
        state.queryDurationMillis = (_h = (_g = action.payload) === null || _g === void 0 ? void 0 : _g.verticalResults) === null || _h === void 0 ? void 0 : _h.queryDurationMillis;
        state.results = (_k = (_j = action.payload) === null || _j === void 0 ? void 0 : _j.verticalResults) === null || _k === void 0 ? void 0 : _k.results;
        state.resultsCount = (_m = (_l = action.payload) === null || _l === void 0 ? void 0 : _l.verticalResults) === null || _m === void 0 ? void 0 : _m.resultsCount;
        state.source = (_p = (_o = action.payload) === null || _o === void 0 ? void 0 : _o.verticalResults) === null || _p === void 0 ? void 0 : _p.source;
    },
    setDisplayName: (state, action) => {
        state.displayName = action.payload;
    },
    setLimit: (state, action) => {
        state.limit = action.payload;
    },
    setOffset: (state, action) => {
        state.offset = action.payload;
    },
    setSortBys: (state, action) => {
        state.sortBys = action.payload;
    },
    setVerticalKey: (state, action) => {
        state.verticalKey = action.payload;
    }
};
/**
 * Registers with Redux the slice of {@link State} pertaining to vertical search. There
 * are reducers for setting the vertical key, search request data, and
 * results.
 */
function createVerticalSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'vertical',
        initialState: exports.initialState,
        reducers
    });
}
exports.default = createVerticalSlice;
//# sourceMappingURL=vertical.js.map