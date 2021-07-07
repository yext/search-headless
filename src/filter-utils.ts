import { CombinedFilter, Filter, FilterCombinator, Matcher, NearFilterValue } from "@yext/answers-core";
import { Range } from "./types/range";

type filterTypes = Filter | CombinedFilter;

export function createEqualsFilter(
  fieldId: string, 
  value: string | number | boolean): Filter {
  return {
    fieldId,
    matcher: Matcher.Equals,
    value
  }
}

export function createNumberRangeFilter(fieldId: string, range: Range<number>): filterTypes {
  return createRangeFilter(fieldId, range);
}

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
    }
  }

  let maxFilter;
  if (max) {
    maxFilter = {
      fieldId,
      value: max.value,
      matcher: max.inclusive ? Matcher.LessThanOrEqualTo : Matcher.LessThan
    }
  }

  if (minFilter && maxFilter) {
    return combineFilters(minFilter, maxFilter, FilterCombinator.AND);
  } else if (minFilter) {
    return minFilter;
  } else {
    return maxFilter;
  }
}

export function createNearMeFilter(position: NearFilterValue): Filter {
  return {
    fieldId: 'builtin.location',
    matcher: Matcher.Near,
    value: position
  }
}

export function combineFilters(
  filterA: filterTypes, 
  filterB: filterTypes,
  combinator: FilterCombinator): CombinedFilter {
  return {
    combinator,
    filters: [filterA, filterB]
  }
}

