import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

/**
 * Maintains the filters applied to the latest search.
 */
export interface FiltersState {
  /**
   * The array of static filters, with data on whether each filter is selected.
   */
  static?: SelectableFilter[];
  /**
   * The array of facet filters, with data on how they should be displayed.
   */
  facets?: DisplayableFacet[];
}