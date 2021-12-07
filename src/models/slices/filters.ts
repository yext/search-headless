import { DisplayableFacet } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

/**
 * Maintains the current state of facets and filters in the application.
 */
export interface FiltersState {
  /**
   * The collection of possible static filters that can be applied to the
   * search results.
   */
  static?: SelectableFilter[];
  /**
   * The dynamic collection of facets that can be applied to filter the search
   * results.
   */
  facets?: DisplayableFacet[];
}