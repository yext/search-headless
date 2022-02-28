import { Filter } from '@yext/answers-core';

/**
 * A {@link Filter} with additional fields meant to be displayed to the end user.
 *
 * @public
 */
export interface DisplayableFilter extends Filter {
  /**
   * Whether or not the filter is selected.
   */
  selected: boolean,
  /**
   * The filter's display name.
   */
  displayName: string
}