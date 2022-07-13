import { Filter } from '@yext/search-core';

/**
 * A {@link Filter} with additional information, such as an
 * optional display name and whether or not it is selected.
 *
 * @public
 */
export interface SelectableFilter extends Filter {
  /**
   * Whether or not the filter is selected.
   */
  selected: boolean,
  /**
   * The filter's display name.
   */
  displayName?: string
}