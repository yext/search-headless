import isEqual from 'lodash/isEqual';

import { Filter } from '@yext/search-core';

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