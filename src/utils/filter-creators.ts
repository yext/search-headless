import { FieldValueStaticFilter, FilterCombinator, Matcher, NearFilterValue, StaticFilter } from '@yext/search-core';
import { BoundedRange } from '../models/utils/boundedrange';

/**
 * Creates a {@link FieldValueStaticFilter} that ensures all results will match
 * a specific field value.
 *
 * @param fieldId - The comparison field's identifier
 * @param value - The value to match
 * @returns The newly created {@link FieldValueStaticFilter} for the field value
 *
 * @public
 */
export function createEqualsStaticFilter(
  fieldId: string,
  value: string | number | boolean
): FieldValueStaticFilter {
  return {
    kind: 'fieldValue',
    fieldId,
    matcher: Matcher.Equals,
    value
  };
}

/**
 * Creates a {@link StaticFilter} that matches all results where the
 * given field value falls in a specific number {@link BoundedRange}.
 *
 * @param fieldId - The comparison field's identifier
 * @param range - The acceptable number range
 * @returns The newly created static filter for the field value range
 *
 * @public
 */
export function createNumberRangeStaticFilter(fieldId: string, range: BoundedRange<number>): StaticFilter {
  return createRangeStaticFilter(fieldId, range);
}

/**
 * Creates a {@link StaticFilter} that matches all results where the
 * given field value falls in a specific Date {@link BoundedRange}.
 *
 * @param fieldId - The comparison field's identifier
 * @param range - The acceptable date range
 * @returns The newly created static filter for the field value range
 *
 * @public
 */
export function createDateRangeStaticFilter(fieldId: string, range: BoundedRange<Date>): StaticFilter {
  return createRangeStaticFilter(fieldId, range);
}

function createRangeStaticFilter(fieldId: string, range: BoundedRange<number|Date>): StaticFilter {
  const { min, max } = range;

  let minFilter;
  if (min) {
    minFilter = {
      kind: 'fieldValue',
      fieldId,
      value: min.value,
      matcher: min.inclusive ? Matcher.GreaterThanOrEqualTo : Matcher.GreaterThan
    };
  }

  let maxFilter;
  if (max) {
    maxFilter = {
      kind: 'fieldValue',
      fieldId,
      value: max.value,
      matcher: max.inclusive ? Matcher.LessThanOrEqualTo : Matcher.LessThan
    };
  }

  if (minFilter && maxFilter) {
    return combineStaticFilters(minFilter, maxFilter, FilterCombinator.AND);
  } else if (minFilter) {
    return minFilter;
  } else {
    return maxFilter;
  }
}

/**
 * Creates a {@link FieldValueStaticFilter} that matches all results within a certain radius
 * of the given position.
 *
 * @param position - The position and radius
 * @returns The newly created {@link FieldValueStaticFilter} for the radius of the position
 *
 * @public
 */
export function createNearMeStaticFilter(position: NearFilterValue): FieldValueStaticFilter {
  return {
    kind: 'fieldValue',
    fieldId: 'builtin.location',
    matcher: Matcher.Near,
    value: position
  };
}

/**
 * Creates a {@link StaticFilter} by applying the specified {@link FilterCombinator}
 * to the two static filters. Throws an error if an attempt is made to combine a
 * conjunction static filter using {@link FilterCombinator.OR}.
 *
 * @param filterA - The first static filter to be combined
 * @param filterB - The second static filter to be combined
 * @param combinator - Specifies how the two static filters should be joined
 * @returns The newly created {@link StaticFilter}
 *
 * @public
 */
export function combineStaticFilters(
  filterA: StaticFilter,
  filterB: StaticFilter,
  combinator: FilterCombinator
): StaticFilter {
  if (combinator === FilterCombinator.OR) {
    if (filterA.kind === 'conjunction' || filterB.kind == 'conjunction') {
      throw new Error('Cannot combine conjunction filters in a disjunction');
    }
    return {
      kind: 'disjunction',
      combinator,
      filters: [filterA, filterB]
    };
  }
  return {
    kind: 'conjunction',
    combinator,
    filters: [filterA, filterB]
  };
}
