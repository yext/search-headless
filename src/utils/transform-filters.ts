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
 * Convert a list of SelectableFilters into the nested filter structure used by Core
 */
function transformAFilterSetToCoreFormat(
  filters: SelectableFilter[]
): Filter | CombinedFilter | null {
  if (filters.length === 0) {
    return null;
  }
  if (filters.length === 1) {
    const { selected:_, ...filter } = filters[0];
    return filter;
  }
  const groupedFilters: Record<string, Filter[]> = filters.reduce((groups, element) => {
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

/**
 * Convert a map of filtersId to filters in nested structure use in Answers Headless
 * to a single nested filter stucture use in Answers Core
 */
export function transformFiltersToCoreFormat(
  filterCollection: Record<string, SelectableFilter[]> | null | undefined
): Filter | CombinedFilter | null {
  if (!filterCollection) {
    return null;
  }

  const coreFormattedFilters: (Filter | CombinedFilter)[] = [];
  Object.values(filterCollection).forEach((selectableFilters: SelectableFilter[]) => {
    const selectedFilters = selectableFilters.filter(selectableFilter => selectableFilter.selected);
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
