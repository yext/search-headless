"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFiltersToCoreFormat = void 0;
const answers_core_1 = require("@yext/answers-core");
/**
 * Combines a list of Filters using the logical OR operator into a
 * {@link CombinedFilter}.
 *
 * @returns The filters combined into a {@link CombinedFilter}, or the original
 *          filter if there is only one in the list
 */
function combineFiltersWithOR(filters) {
    if (filters.length === 1) {
        return filters[0];
    }
    return {
        combinator: answers_core_1.FilterCombinator.OR,
        filters: filters
    };
}
/**
 * Converts a list of {@link SelectableFilter}s used in Answers Headless
 * to a single nested filter stucture used in Answers Core.
 *
 * @param selectableFilters - The filters to be transformed
 * @returns The filters in a singly-nested {@link CombinedFilter}, or if there
 *          is only one filter in the list and it is selected, returns that
 *          {@link Filter}
 */
function transformFiltersToCoreFormat(selectableFilters) {
    if (!selectableFilters) {
        return null;
    }
    if (selectableFilters.length === 0) {
        return null;
    }
    if (selectableFilters.length === 1) {
        const _a = selectableFilters[0], { selected, displayName: _ } = _a, filter = __rest(_a, ["selected", "displayName"]);
        return selected ? filter : null;
    }
    const selectedFilters = selectableFilters.filter(selectableFilter => selectableFilter.selected);
    const groupedFilters = selectedFilters.reduce((groups, element) => {
        const { selected: _, displayName: __ } = element, filter = __rest(element, ["selected", "displayName"]);
        groups[filter.fieldId]
            ? groups[filter.fieldId].push(filter)
            : groups[filter.fieldId] = [filter];
        return groups;
    }, {});
    const groupedFilterLabels = Object.keys(groupedFilters);
    if (groupedFilterLabels.length === 1) {
        return combineFiltersWithOR(groupedFilters[groupedFilterLabels[0]]);
    }
    return {
        combinator: answers_core_1.FilterCombinator.AND,
        filters: Object.values(groupedFilters).map((filters) => combineFiltersWithOR(filters))
    };
}
exports.transformFiltersToCoreFormat = transformFiltersToCoreFormat;
//# sourceMappingURL=transform-filters.js.map