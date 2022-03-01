import { Filter } from '@yext/answers-core';

/**
 * A {@link Filter} with additional information, such as optional
 * display name and whether it is or not selected.
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