import isEqual from 'lodash/isEqual';

import { CombinedFilter, Filter } from '@yext/search-core';

/**
 * Returns true if the two given filters are the same.
 *
 * @param thisFilter - The first filter to compare
 * @param otherFilter - The second filter to compare
 * @returns Whether the two filters are the same or not
 */
export function areFiltersEqual(thisFilter: Filter, otherFilter: Filter): boolean {
  return thisFilter.fieldId === otherFilter.fieldId
  && thisFilter.matcher === otherFilter.matcher
  && isEqual(thisFilter.value, otherFilter.value);
}

/**
 * Returns true if the two given combined filters are the same.
 *
 * @param thisFilter - The first combined filter to compare
 * @param otherFilter - The second combined filter to compare
 * @returns Whether the two combined filters are the same or not
 */
export function areCombinedFiltersEqual(thisFilter: CombinedFilter, otherFilter: CombinedFilter): boolean {
  return thisFilter.combinator === otherFilter.combinator &&
    isEqual(thisFilter.filters, otherFilter.filters);
}

/**
 * Returns true if the given filter is a {@link CombinedFilter}.
 *
 * @returns Whether the filter is a {@link CombinedFilter}
 */
export function isCombinedFilter(filter: unknown): filter is CombinedFilter {
  const combinedFilter = filter as CombinedFilter;
  return combinedFilter.combinator !== undefined && combinedFilter.filters !== undefined;
}