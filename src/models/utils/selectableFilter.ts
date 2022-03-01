import { Filter } from '@yext/answers-core';

/**
 * A {@link Filter} that can be selected and maintains whether or not it is.
 *
 * @deprecated Will be removed in favor of {@link DisplayableFilter} in the next major version.
 * @public
 */
export interface SelectableFilter extends Filter {
  /**
   * Whether or not the filter is selected.
   */
  selected: boolean
}