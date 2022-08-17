var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { createSlice } from '@reduxjs/toolkit';
import { areFiltersEqual } from '../utils/filter-utils';
export const initialState = {};
const reducers = {
    setStatic: (state, action) => {
        state.static = action.payload;
    },
    setFacets: (state, action) => {
        state.facets = action.payload;
    },
    resetFacets: (state) => {
        var _a;
        (_a = state.facets) === null || _a === void 0 ? void 0 : _a.forEach(facet => {
            facet.options.forEach(o => o.selected = false);
        });
    },
    setFacetOption: (state, { payload }) => {
        if (!state.facets) {
            console.warn('Trying to select a facet option when no facets exist.');
            return;
        }
        const { fieldId, facetOption: optionToSelect, shouldSelect } = payload;
        const facetsWithFieldId = state.facets.filter(f => f.fieldId === fieldId);
        if (facetsWithFieldId.length === 0) {
            console.warn(`Could not select a facet option for fieldId "${fieldId}": the fieldId was not found.`);
            return;
        }
        facetsWithFieldId.forEach(facet => {
            // Mutating is OK because redux-toolkit uses the immer package
            facet.options = facet.options.map(o => {
                if (o.matcher !== optionToSelect.matcher || o.value !== optionToSelect.value) {
                    return o;
                }
                return Object.assign(Object.assign({}, o), { selected: shouldSelect });
            });
        });
    },
    /**
     * Sets whether a static filter currently in the state is selected or unselected.
     * If the specified static filter should be selected, but is not in state, it will
     * be added to the state.
     */
    setFilterOption: (state, { payload }) => {
        if (!state.static) {
            state.static = [];
        }
        const { selected, displayName: _ } = payload, targetFilter = __rest(payload, ["selected", "displayName"]);
        const matchingFilter = state.static.find(storedFilter => {
            return areFiltersEqual(storedFilter, targetFilter);
        });
        if (matchingFilter) {
            matchingFilter.selected = selected;
        }
        else if (selected) {
            state.static.push(payload);
        }
        else {
            console.warn('Could not unselect a non-existing filter option in state '
                + `with the following fields:\n${JSON.stringify(targetFilter)}.`);
        }
    }
};
/**
 * Registers with Redux the slice of {@link State} pertaining to filters. There are
 * reducers for setting the static filters and facet options.
 */
export default function createFiltersSlice(prefix) {
    return createSlice({
        name: prefix + 'filters',
        initialState,
        reducers
    });
}
//# sourceMappingURL=filters.js.map