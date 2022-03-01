import { DisplayableFacet } from '@yext/answers-core';
import { SelectableFilter } from '..';
import { DisplayableFilter } from '../utils/displayableFilter';

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
  static?: SelectableFilter[] | DisplayableFilter[];
  /**
   * The dynamic collection of facets that can be applied to filter the search
   * results and whether each of them is currently selected.
   */
  facets?: DisplayableFacet[];
}