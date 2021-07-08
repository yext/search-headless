import { CombinedFilter, Filter, FilterCombinator, Matcher, NearFilterValue } from '@yext/answers-core';
import { Range } from '../models/utils/range';

type filterTypes = Filter | CombinedFilter;

/**
 * Creates a simple {@link Filter} that ensures all results will match a specific
 * field value.
 *
 * @param fieldId - The comparrison field's identifier.
 * @param value - The value to match.
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
 * given field value falls in a specific number {@link Range}.
 *
 * @param fieldId - The comparrison field's identifier.
 * @param range - The acceptable number range.
 */
export function createNumberRangeFilter(fieldId: string, range: Range<number>): filterTypes {
  return createRangeFilter(fieldId, range);
}

/**
 * Creates a {@link Filter} or {@link CombinedFilter} that matches all results where the
 * given field value falls in a specific Date {@link Range}.
 *
 * @param fieldId - The comparrison field's identifier.
 * @param range - The acceptable date range.
 */
export function createDateRangeFilter(
  fieldId: string,
  range: Range<Date>): filterTypes {
  return createRangeFilter(fieldId, range);
}

function createRangeFilter(fieldId: string, range: Range<number|Date>): filterTypes {
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
 * @param position - The position and radius.
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
 * @param filterA - The first filter to be combined.
 * @param filterB - The second filter to be combined.
 * @param combinator - Specifies how the two filters should be joined.
 */
export function combineFilters(
  filterA: filterTypes,
  filterB: filterTypes,
  combinator: FilterCombinator): CombinedFilter {
  return {
    combinator,
    filters: [filterA, filterB]
  };
}

