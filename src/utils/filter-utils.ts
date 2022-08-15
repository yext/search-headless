import isEqual from 'lodash/isEqual';

import { FieldValueFilter, StaticFilter } from '@yext/search-core';

/**
 * Returns true if the two given field value filters are the same.
 *
 * @param thisFilter - The first field value filter to compare
 * @param otherFilter - The second field value filter to compare
 * @returns Whether the two field value filters are the same or not
 */
export function areFieldValueFiltersEqual(
  thisFilter: FieldValueFilter,
  otherFilter: FieldValueFilter
): boolean {
  return thisFilter.fieldId === otherFilter.fieldId
    && thisFilter.matcher === otherFilter.matcher
    && isEqual(thisFilter.value, otherFilter.value);
}

/**
 * Returns true if the two given static filters are the same.
 *
 * @param thisFilter - The first static filter to compare
 * @param otherFilter - The second static filter to compare
 * @returns Whether the two static filters are the same or not
 */
export function areStaticFiltersEqual(thisFilter: StaticFilter, otherFilter: StaticFilter): boolean {
  if (thisFilter.kind === 'fieldValue') {
    return otherFilter.kind === 'fieldValue'
      ? areFieldValueFiltersEqual(thisFilter, otherFilter)
      : false;
  }

  if (otherFilter.kind === 'fieldValue') {
    return false;
  }

  return thisFilter.combinator === otherFilter.combinator
    && thisFilter.filters.length === otherFilter.filters.length
    && thisFilter.filters.every((f, index) => areStaticFiltersEqual(f, otherFilter.filters[index]));
}