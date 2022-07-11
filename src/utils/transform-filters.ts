import { CombinedFilter, Filter, FilterCombinator } from '@yext/answers-core';
import { SelectableFilter } from '../models/utils/selectableFilter';

/**
 * Combines a list of Filters using the logical OR operator into a
 * {@link CombinedFilter}.
 *
 * @returns The filters combined into a {@link CombinedFilter}, or the original
 *          filter if there is only one in the list
 */
function combineFiltersWithOR(filters: Filter[]): Filter | CombinedFilter {
  if (filters.length === 1) {
    return filters[0];
  }
  return {
    combinator: FilterCombinator.OR,
    filters: filters
  };
}

/**
 * Converts a list of {@link SelectableFilter}s used in Search Headless
 * to a single nested filter stucture used in Search Core.
 *
 * @param selectableFilters - The filters to be transformed
 * @returns The filters in a singly-nested {@link CombinedFilter}, or if there
 *          is only one filter in the list and it is selected, returns that
 *          {@link Filter}
 */
export function transformFiltersToCoreFormat(
  selectableFilters: SelectableFilter[] | undefined
): Filter | CombinedFilter | null {
  if (!selectableFilters) {
    return null;
  }
  if (selectableFilters.length === 0) {
    return null;
  }
  if (selectableFilters.length === 1) {
    const { selected, displayName:_, ...filter } = selectableFilters[0];
    return selected ? filter : null;
  }
  const selectedFilters = selectableFilters.filter(selectableFilter => selectableFilter.selected);
  const groupedFilters: Record<string, Filter[]> = selectedFilters.reduce((groups, element) => {
    const { selected:_, displayName:__, ...filter } = element;
    groups[filter.fieldId]
      ? groups[filter.fieldId].push(filter)
      : groups[filter.fieldId] = [filter];
    return groups;
  }, {});

  const groupedFilterLabels = Object.keys(groupedFilters);
  if (groupedFilterLabels.length === 1) {
    return combineFiltersWithOR(groupedFilters[groupedFilterLabels[0]]);
  }
  return {
    combinator: FilterCombinator.AND,
    filters: Object.values(groupedFilters).map((filters: Filter[]) => combineFiltersWithOR(filters))
  };
}
