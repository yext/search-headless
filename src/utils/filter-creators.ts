import { CombinedFilter, Filter, FilterCombinator, Matcher, NearFilterValue } from '@yext/answers-core';
import { BoundedRange } from '../models/utils/boundedrange';

/**
 * A union type for the different kinds of filter.
 *
 * @public
 */
export type FilterTypes = Filter | CombinedFilter;

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
export function createEqualsFilter(
  fieldId: string,
  value: string | number | boolean): Filter {
  return {
    fieldId,
    matcher: Matcher.Equals,
    value
  };
}

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
export function createNumberRangeFilter(fieldId: string, range: BoundedRange<number>): FilterTypes {
  return createRangeFilter(fieldId, range);
}

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
export function createDateRangeFilter(
  fieldId: string,
  range: BoundedRange<Date>): FilterTypes {
  return createRangeFilter(fieldId, range);
}

function createRangeFilter(fieldId: string, range: BoundedRange<number|Date>): FilterTypes {
  const { min, max } = range;

  let minFilter;
  if (min) {
    minFilter = {
      fieldId,
      value: min.value,
      matcher: min.inclusive ? Matcher.GreaterThanOrEqualTo : Matcher.GreaterThan
    };
  }

  let maxFilter;
  if (max) {
    maxFilter = {
      fieldId,
      value: max.value,
      matcher: max.inclusive ? Matcher.LessThanOrEqualTo : Matcher.LessThan
    };
  }

  if (minFilter && maxFilter) {
    return combineFilters(minFilter, maxFilter, FilterCombinator.AND);
  } else if (minFilter) {
    return minFilter;
  } else {
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
export function createNearMeFilter(position: NearFilterValue): Filter {
  return {
    fieldId: 'builtin.location',
    matcher: Matcher.Near,
    value: position
  };
}

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
export function combineFilters(
  filterA: FilterTypes,
  filterB: FilterTypes,
  combinator: FilterCombinator): CombinedFilter {
  return {
    combinator,
    filters: [filterA, filterB]
  };
}
