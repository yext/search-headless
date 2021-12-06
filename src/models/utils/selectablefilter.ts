import { Filter } from '@yext/answers-core';

/**
 * A {@link Filter} that can be selected.
 */
export interface SelectableFilter extends Filter {
  /**
   * Whether the filter is selected or not.
   */
  selected: boolean
}