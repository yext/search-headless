import { CombinedFilter, Filter, FilterCombinator } from '@yext/answers-core';
import { SelectableFilter } from '../models/utils/selectablefilter';

/**
 * Combine a list of Filters using the logical OR operator into a CombinedFilter
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
 * Convert a list of SelectableFilters use in Answers Headless
 * to a single nested filter stucture use in Answers Core
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
    const { selected:_, ...filter } = selectableFilters[0];
    return filter;
  }
  const selectedFilters = selectableFilters.filter(selectableFilter => selectableFilter.selected);
  const groupedFilters: Record<string, Filter[]> = selectedFilters.reduce((groups, element) => {
    const { selected:_, ...filter } = element;
    groups[element.fieldId]
      ? groups[element.fieldId].push({ ...filter })
      : groups[element.fieldId] = [{ ...filter }];
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
