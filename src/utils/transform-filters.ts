import { CombinedFilter, Filter, FilterCombinator } from '@yext/answers-core';
import { CombinedSelectableFilter, SelectableFilter } from '../models/utils/selectablefilter';


function formatOrFilters(filters: Filter[]): SelectableFilter | CombinedSelectableFilter {
  if (filters.length === 1) {
    return {
      filter: filters[0],
      selectable: false
    };
  }
  const selectableFilters = filters.map(filter => ({
    filter: filter,
    selectable: false
  }));

  return {
    combinator: FilterCombinator.OR,
    filters: selectableFilters
  };
}

/**
 * Convert a list of filters to nested filter structure use in Headless
 */
export function transformFiltersToHeadlessFormat(
  filters: Filter[]
): SelectableFilter | CombinedSelectableFilter | null {
  if (!filters || filters.length === 0) {
    return null;
  }
  if (filters.length === 1) {
    return {
      filter: filters[0],
      selectable: false
    };
  }
  const groupedFilters: Record<string, Filter[]> = filters.reduce((groups, element) => {
    groups[element.fieldId]
      ? groups[element.fieldId].push(element)
      : groups[element.fieldId] = [element];
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
  filters: Record<string, SelectableFilter | CombinedSelectableFilter | null> | undefined
): Filter | CombinedFilter | null {
  if (!filters) {
    return null;
  }

  const getCoreFormattedFilters = (
    filter: SelectableFilter | CombinedSelectableFilter
  ): Filter | CombinedFilter => {
    if ('selectable' in filter) {
      return { ...filter.filter };
    }
    return {
      combinator: filter.combinator,
      filters: filter.filters.map(filter => getCoreFormattedFilters(filter))
    };
  };

  const coreFormattedFilters: (Filter | CombinedFilter)[] = [];
  Object.values(filters).forEach(filter => {
    filter && coreFormattedFilters.push(getCoreFormattedFilters(filter));
  });
  if (coreFormattedFilters.length === 1) {
    return coreFormattedFilters[0];
  }
  return {
    combinator: FilterCombinator.AND,
    filters: coreFormattedFilters
  };
}
