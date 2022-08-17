"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areFiltersEqual = void 0;
/**
 * Returns true if the two given filters are the same.
 *
 * @param thisFilter - The first filter to compare
 * @param otherFilter - The second filter to compare
 * @returns Whether the two filters are the same or not
 */
function areFiltersEqual(thisFilter, otherFilter) {
    return thisFilter.fieldId === otherFilter.fieldId
        && thisFilter.matcher === otherFilter.matcher
        && thisFilter.value === otherFilter.value;
}
exports.areFiltersEqual = areFiltersEqual;
//# sourceMappingURL=filter-utils.js.map