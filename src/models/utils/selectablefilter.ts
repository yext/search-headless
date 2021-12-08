import { Filter } from '@yext/answers-core';

/**
 * A {@link Filter} that can be selected and maintains whether or not it is.
 */
export interface SelectableFilter extends Filter {
  /**
   * Whether the filter is selected or not.
   */
  selected: boolean
}