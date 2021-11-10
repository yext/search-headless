import { Filter } from '@yext/answers-core';

/**
 * Returns true if the two given filters are the same
 */
export function areFiltersEqual(thisFilter: Filter, otherFilter: Filter): boolean {
  return thisFilter.fieldId === otherFilter.fieldId
  && thisFilter.matcher === otherFilter.matcher
  && thisFilter.value === otherFilter.value;
}