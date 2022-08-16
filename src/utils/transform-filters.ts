import { FieldValueStaticFilter, FilterCombinator, StaticFilter } from '@yext/search-core';
import { SelectableStaticFilter } from '../models/utils/selectableStaticFilter';

/**
 * Combines a list of field value static filters using the logical OR operator
 * into a single {@link StaticFilter}.
 *
 * @returns The filters combined into a single {@link StaticFilter}
 */
function combineFiltersWithOR(filters: FieldValueStaticFilter[]): StaticFilter {
  if (filters.length === 1) {
    return filters[0];
  }
  return {
    kind: 'disjunction',
    combinator: FilterCombinator.OR,
    filters
  };
}

/**
 * Converts a list of {@link SelectableStaticFilter}s used in Search Headless
 * to a single static filter expected by Search Core.
 *
 * @param selectableFilters - The filters to be transformed
 * @returns The filters combined into a single {@link StaticFilter}
 */
export function transformFiltersToCoreFormat(
  selectableFilters: SelectableStaticFilter[] | undefined
): StaticFilter | null {
  if (!selectableFilters) {
    return null;
  }

  const selectedFilters: StaticFilter[] = selectableFilters
    .filter(selectableFilter => selectableFilter.selected)
    .map(selectableFilter => selectableFilter.filter);
  if (selectedFilters.length === 0) {
    return null;
  }
  if (selectedFilters.length === 1) {
    return selectedFilters[0];
  }

  const combinationFilters: StaticFilter[] = [];
  const fieldIdToFilters: Record<string, FieldValueStaticFilter[]> = selectedFilters.reduce(
    (fieldIdToFilters, filter) => {
      if (filter.kind !== 'fieldValue') {
        combinationFilters.push(filter);
      } else {
        fieldIdToFilters[filter.fieldId]
          ? fieldIdToFilters[filter.fieldId].push(filter)
          : fieldIdToFilters[filter.fieldId] = [filter];
      }
      return fieldIdToFilters;
    }, {}
  );

  const filters = Object.values(fieldIdToFilters);
  if (filters.length === 1 && combinationFilters.length === 0) {
    return combineFiltersWithOR(filters[0]);
  }
  return {
    kind: 'conjunction',
    combinator: FilterCombinator.AND,
    filters: filters.map(filters => combineFiltersWithOR(filters)).concat(combinationFilters)
  };
}
