import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

/**
 * The state for filters.
 */
export interface FiltersState {
  /**
   * The array of static filters to apply to a search, with data on whether each filter is selected.
   */
  static?: SelectableFilter[];
  /**
   * The array of facet filters to apply to a search, with data on how they should be displayed.
   */
  facets?: DisplayableFacet[];
}