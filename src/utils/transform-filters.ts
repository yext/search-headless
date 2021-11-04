import { CombinedFilter, Filter, FilterCombinator } from '@yext/answers-core';
import { SelectableFilter } from '../models/utils/selectablefilter';

function formatOrFilters(filters: Filter[]): Filter | CombinedFilter {
  if (filters.length === 1) {
    return filters[0];
  }
  return {
    combinator: FilterCombinator.OR,
    filters: filters
  };
}

/**
 * Convert a list of SelectableFilter to nested filter structure use in core
 */
function transformAFilterSetToCoreFormat(
  filters: SelectableFilter[]
): Filter | CombinedFilter | null {
  if (filters.length === 0) {
    return null;
  }
  if (filters.length === 1) {
    return { ...filters[0].filter };
  }
  const groupedFilters: Record<string, Filter[]> = filters.reduce((groups, element) => {
    groups[element.filter.fieldId]
      ? groups[element.filter.fieldId].push({ ...element.filter })
      : groups[element.filter.fieldId] = [{ ...element.filter }];
    return groups;
  }, {});

  const groupedFilterLabels = Object.keys(groupedFilters);
  if (groupedFilterLabels.length === 1) {
    return formatOrFilters(groupedFilters[groupedFilterLabels[0]]);
  }
  return {
    combinator: FilterCombinator.AND,
    filters: Object.values(groupedFilters).map((filters: Filter[]) => formatOrFilters(filters))
  };
}

/**
 * Convert a map of filtersId to filters in nested structure use in Answers Headless
 * to a single nested filter stucture use in Answers Core
 */
export function transformFiltersToCoreFormat(
  filters: Record<string, SelectableFilter[]> | null | undefined
): Filter | CombinedFilter | null {
  if (!filters) {
    return null;
  }

  const coreFormattedFilters: (Filter | CombinedFilter)[] = [];
  Object.values(filters).forEach((filter: SelectableFilter[]) => {
    const selectedFilters = filter.filter(filter => filter.selected);
    const transformedFilterSet = transformAFilterSetToCoreFormat(selectedFilters);
    transformedFilterSet && coreFormattedFilters.push(transformedFilterSet);
  });

  if (coreFormattedFilters.length === 0) {
    return null;
  }
  if (coreFormattedFilters.length === 1) {
    return coreFormattedFilters[0];
  }
  return {
    combinator: FilterCombinator.AND,
    filters: coreFormattedFilters
  };
}
