import { StaticFilter } from '@yext/search-core';

/**
 * A {@link StaticFilter} with additional information, such as an
 * optional display name and whether or not it is selected.
 *
 * @public
 */
export interface SelectableStaticFilter {
  /**
   * {@inheritDoc StaticFilter}
   */
  filter: StaticFilter,
  /**
   * Whether or not the filter is selected.
   */
  selected: boolean,
  /**
   * The filter's display name.
   */
  displayName?: string
}