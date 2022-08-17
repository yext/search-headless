"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineFilters = exports.createNearMeFilter = exports.createDateRangeFilter = exports.createNumberRangeFilter = exports.createEqualsFilter = void 0;
const answers_core_1 = require("@yext/answers-core");
/**
 * Creates a simple {@link Filter} that ensures all results will match a specific
 * field value.
 *
 * @param fieldId - The comparison field's identifier
 * @param value - The value to match
 * @returns The newly created {@link Filter} for the field value
 *
 * @public
 */
function createEqualsFilter(fieldId, value) {
    return {
        fieldId,
        matcher: answers_core_1.Matcher.Equals,
        value
    };
}
exports.createEqualsFilter = createEqualsFilter;
/**
 * Creates a {@link Filter} or {@link CombinedFilter} that matches all results where the
 * given field value falls in a specific number {@link BoundedRange}.
 *
 * @param fieldId - The comparison field's identifier
 * @param range - The acceptable number range
 * @returns The newly created filter for the field value range
 *
 * @public
 */
function createNumberRangeFilter(fieldId, range) {
    return createRangeFilter(fieldId, range);
}
exports.createNumberRangeFilter = createNumberRangeFilter;
/**
 * Creates a {@link Filter} or {@link CombinedFilter} that matches all results where the
 * given field value falls in a specific Date {@link BoundedRange}.
 *
 * @param fieldId - The comparison field's identifier
 * @param range - The acceptable date range
 * @returns The newly created filter for the field value range
 *
 * @public
 */
function createDateRangeFilter(fieldId, range) {
    return createRangeFilter(fieldId, range);
}
exports.createDateRangeFilter = createDateRangeFilter;
function createRangeFilter(fieldId, range) {
    const { min, max } = range;
    let minFilter;
    if (min) {
        minFilter = {
            fieldId,
            value: min.value,
            matcher: min.inclusive ? answers_core_1.Matcher.GreaterThanOrEqualTo : answers_core_1.Matcher.GreaterThan
        };
    }
    let maxFilter;
    if (max) {
        maxFilter = {
            fieldId,
            value: max.value,
            matcher: max.inclusive ? answers_core_1.Matcher.LessThanOrEqualTo : answers_core_1.Matcher.LessThan
        };
    }
    if (minFilter && maxFilter) {
        return combineFilters(minFilter, maxFilter, answers_core_1.FilterCombinator.AND);
    }
    else if (minFilter) {
        return minFilter;
    }
    else {
        return maxFilter;
    }
}
/**
 * Creates a {@link Filter} that matches all results within a certain radius of the
 * given position.
 *
 * @param position - The position and radius
 * @returns The newly created {@link Filter} for the radius of the position
 *
 * @public
 */
function createNearMeFilter(position) {
    return {
        fieldId: 'builtin.location',
        matcher: answers_core_1.Matcher.Near,
        value: position
    };
}
exports.createNearMeFilter = createNearMeFilter;
/**
 * Creates a {@link CombinedFilter} by applying the specified {@link FilterCombinator}
 * to the two filters.
 *
 * @param filterA - The first filter to be combined
 * @param filterB - The second filter to be combined
 * @param combinator - Specifies how the two filters should be joined
 * @returns The newly created {@link CombinedFilter}
 *
 * @public
 */
function combineFilters(filterA, filterB, combinator) {
    return {
        combinator,
        filters: [filterA, filterB]
    };
}
exports.combineFilters = combineFilters;
//# sourceMappingURL=filter-creators.js.map