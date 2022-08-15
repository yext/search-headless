import { DisplayableFacet } from '@yext/search-core';
import { SelectableStaticFilter } from '../utils/selectableStaticFilter';

/**
 * Maintains the current state of facets and filters in the application.
 *
 * @public
 */
export interface FiltersState {
  /**
   * The collection of possible static filters that can be applied to the
   * search results and whether each of them is currently selected.
   */
  static?: SelectableStaticFilter[],
  /**
   * The dynamic collection of facets that can be applied to filter the search
   * results and whether each of them is currently selected.
   */
  facets?: DisplayableFacet[]
}